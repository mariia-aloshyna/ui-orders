import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import {
  Button,
  Callout,
  Checkbox,
  Col,
  ConfirmationModal,
  IconButton,
  MultiColumnList,
  Pane,
  PaneMenu,
  Paneset,
  Row,
  SearchField,
} from '@folio/stripes/components';

import {
  ORDER,
  RECEIVE,
  RECEIVING_HISTORY as RECEIVING_HISTORY_RESOURCE,
} from '../Utils/resources';
import { LIMIT_MAX } from '../Utils/const';
import FolioFormattedTime from '../FolioFormattedTime';
import ReceivingLinks, { RECEIVING_HISTORY } from './ReceivingLinks';
import { PIECE_STATUS_RECEIVED } from './const';
import {
  historyRemoveItems,
  reducePieces,
} from './util';

class ReceivingHistory extends Component {
  static manifest = Object.freeze({
    query: {},
    receivingHistory: RECEIVING_HISTORY_RESOURCE,
    order: ORDER,
    receive: RECEIVE,
  })

  static propTypes = {
    location: ReactRouterPropTypes.location,
    mutator: PropTypes.object,
    resources: PropTypes.object,
    match: ReactRouterPropTypes.match,
  }

  constructor(props) {
    super(props);
    this.callout = React.createRef();
  }

  state = {
    checkedPiecesMap: {},
    confirming: false,
    isAllChecked: false,
    searchText: '',
  };

  componentDidMount() {
    const { mutator: { receivingHistory }, match: { params: { id, lineId } } } = this.props;
    const params = {
      limit: LIMIT_MAX,
      query: `receivingStatus==${PIECE_STATUS_RECEIVED} and purchaseOrderId==${id}${lineId ? ` and poLineId==${lineId}` : ''}`,
    };

    receivingHistory.reset();
    receivingHistory.GET({ params });
  }

  onCloseReceiving = () => {
    const { location, mutator } = this.props;

    mutator.query.update({
      _path: location.pathname.replace(RECEIVING_HISTORY, ''),
    });
  }

  getFirstMenu = () => (
    <PaneMenu>
      <FormattedMessage id="ui-orders.buttons.line.close">
        {(title) => (
          <IconButton
            ariaLabel={title}
            data-test-close-button
            icon="times"
            onClick={this.onCloseReceiving}
          />
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  toggleItem = (piece) => {
    const { id } = piece;

    this.setState(({ checkedPiecesMap }) => {
      const newValue = checkedPiecesMap[id] ? null : piece;

      return {
        checkedPiecesMap: {
          ...checkedPiecesMap,
          [id]: newValue,
        },
      };
    });
  }

  toggleAll = () => {
    this.setState((state, { resources }) => {
      const receivingHistory = this.getData(resources);
      const isAllChecked = !state.isAllChecked;
      const checkedPiecesMap = reducePieces(receivingHistory, isAllChecked);

      return {
        checkedPiecesMap,
        isAllChecked,
      };
    });
  }

  getData = (resources) => {
    const { searchText } = this.state;
    const receivingHistory = get(resources, ['receivingHistory', 'records'], []);

    return searchText
      ? receivingHistory.filter(piece => piece.title.includes(searchText))
      : receivingHistory;
  }

  changeSearchText = (event) => {
    const searchText = get(event, 'target.value', '');

    this.setState({ searchText });
  }

  showConfirm = () => this.setState({ confirming: true });

  hideConfirm = () => this.setState({ confirming: false });

  handleSubmit = () => {
    this.hideConfirm();
    historyRemoveItems(this.state.checkedPiecesMap, this.props.mutator.receive)
      .then(() => this.callout.current.sendCallout({
        type: 'success',
        message: <FormattedMessage id="ui-orders.receivingHistory.remove.success" />,
      }))
      .catch(() => this.callout.current.sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-orders.receivingHistory.remove.error" />,
      }));
  }

  render() {
    const { checkedPiecesMap, confirming, isAllChecked, searchText } = this.state;
    const { mutator, location, resources } = this.props;
    const contentData = this.getData(resources);
    const orderNumber = get(resources, ['order', 'records', 0, 'po_number']);
    const isRemoveButtonDisabled = Object.values(checkedPiecesMap).filter(Boolean).length === 0;
    const resultsFormatter = {
      'isChecked': (piece) => (
        <Checkbox
          type="checkbox"
          checked={Boolean(checkedPiecesMap[piece.id])}
        />
      ),
      'title': piece => get(piece, 'title', ''),
      'poLineNumber': piece => get(piece, 'poLineNumber', ''),
      'dateOrdered': piece => <FolioFormattedTime dateString={get(piece, 'dateOrdered')} />,
      'dateReceived': piece => <FolioFormattedTime dateString={get(piece, 'receivedDate')} />,
      'barcode': piece => get(piece, 'barcode', ''),
      'receivingNote': piece => get(piece, 'receivingNote', ''),
      'receivingStatus': piece => get(piece, 'receivingStatus', ''),
    };

    return (
      <div data-test-receiving-history>
        <Paneset>
          <Pane
            defaultWidth="fill"
            paneTitle={(
              <FormattedMessage
                id="ui-orders.receivingHistory.paneTitle"
                values={{ orderNumber }}
              />
            )}
            firstMenu={this.getFirstMenu()}
          >
            <Row center="xs">
              <Col xs>
                <ReceivingLinks
                  location={location}
                  mutator={mutator}
                />
              </Col>
            </Row>
            <Row end="xs">
              <Col data-test-receiving-history-search>
                <SearchField
                  marginBottom0
                  onChange={this.changeSearchText}
                  onClear={this.changeSearchText}
                  value={searchText}
                />
              </Col>
              <Col>
                <Button
                  buttonStyle="primary"
                  data-test-receiving-remove
                  disabled={isRemoveButtonDisabled}
                  marginBottom0
                  onClick={this.showConfirm}
                >
                  <FormattedMessage id="ui-orders.receiving.btn.remove" />
                </Button>
              </Col>
            </Row>
            <MultiColumnList
              fullWidth
              formatter={resultsFormatter}
              contentData={contentData}
              columnMapping={{
                isChecked: <Checkbox type="checkbox" checked={isAllChecked} onChange={this.toggleAll} />,
                title: <FormattedMessage id="ui-orders.receiving.title" />,
                poLineNumber: <FormattedMessage id="ui-orders.receiving.poLine" />,
                dateOrdered: <FormattedMessage id="ui-orders.receiving.dateOrdered" />,
                dateReceived: <FormattedMessage id="ui-orders.receivingHistory.dateReceived" />,
                barcode: <FormattedMessage id="ui-orders.receiving.barcode" />,
                receivingNote: <FormattedMessage id="ui-orders.receivingHistory.note" />,
                receivingStatus: <FormattedMessage id="ui-orders.receiving.status" />,
              }}
              columnWidths={{ isChecked: '35px' }}
              visibleColumns={['isChecked', 'title', 'poLineNumber', 'dateOrdered', 'dateReceived', 'receivingNote', 'receivingStatus']}
              onRowClick={(_, piece) => this.toggleItem(piece)}
            />
          </Pane>
        </Paneset>
        {confirming && (
          <ConfirmationModal
            confirmLabel={<FormattedMessage id="ui-orders.receivingHistory.confirmation.confirm" />}
            heading={<FormattedMessage id="ui-orders.receivingHistory.confirmation.heading" />}
            message={<FormattedMessage id="ui-orders.receivingHistory.confirmation.message" />}
            onCancel={this.hideConfirm}
            onConfirm={this.handleSubmit}
            open
          />
        )}
        <Callout ref={this.callout} />
      </div>
    );
  }
}

export default ReceivingHistory;
