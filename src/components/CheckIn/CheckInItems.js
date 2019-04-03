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
  MultiColumnList,
  Row,
  SearchField,
} from '@folio/stripes/components';

import {
  ERESOURCE,
  OTHER,
  PE_MIX,
  PHYSICAL,
} from '../POLine/const';
import {
  LINE,
  LOCATIONS,
  ORDER_PIECES,
  RECEIVING_HISTORY,
} from '../Utils/resources';
import { PIECE_STATUS_EXPECTED } from '../Receiving/const';
import getLocationsForSelect from '../Utils/getLocationsForSelect';
import { LIMIT_MAX } from '../Utils/const';
import CheckInDetails from './CheckInDetails';
import AddPieceModal from './AddPieceModal';
import { PIECE_FORMAT } from './FieldPieceFormat';

const ORDER_FORMAT_TO_PIECE_FORMAT = {
  [ERESOURCE]: PIECE_FORMAT.electronic,
  [OTHER]: PIECE_FORMAT.other,
  [PHYSICAL]: PIECE_FORMAT.physical,
};

class CheckInItems extends Component {
  static manifest = Object.freeze({
    LINE,
    locations: LOCATIONS,
    ORDER_PIECES,
    query: {},
    RECEIVING_HISTORY,
  })

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    mutator: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    resources: PropTypes.object,
    stripes: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.connectedAddPieceModal = props.stripes.connect(AddPieceModal);
    this.connectedCheckInDetails = props.stripes.connect(CheckInDetails);
    this.callout = React.createRef();
  }

  state = {
    addPieceModalOpened: false,
    checkInDetailsModalOpened: false,
    isAllChecked: false,
    items: [],
    searchText: '',
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    const { mutator, match: { params: { id, lineId } } } = this.props;
    const params = {
      limit: LIMIT_MAX,
      query: `checkin == true and receivingStatus==${PIECE_STATUS_EXPECTED} and purchaseOrderId==${id}${lineId ? ` and poLineId==${lineId}` : ''}`,
    };

    mutator.RECEIVING_HISTORY.reset();
    mutator.RECEIVING_HISTORY.GET({ params })
      .then(items => {
        this.setState({ items });
      });
  }

  getItems = () => {
    const { items, searchText } = this.state;

    return searchText
      ? items.filter(item => item.title.toLocaleLowerCase().includes(searchText))
      : items;
  }

  toggleItem = (item) => {
    item.isChecked = !item.isChecked;
    this.setState(state => {
      const items = [...state.items];

      return { items };
    });
  }

  toggleAll = () => {
    this.setState((state) => {
      const isAllChecked = !state.isAllChecked;
      const items = state.items.map(item => ({
        ...item,
        isChecked: isAllChecked,
      }));

      return {
        isAllChecked,
        items,
      };
    });
  }

  changeSearchText = (event) => {
    const searchText = get(event, 'target.value', '').toLocaleLowerCase();

    this.setState({ searchText });
  }

  checkInDetailsModalOpen = () => {
    this.setState({ checkInDetailsModalOpened: true });
  }

  checkInDetailsModalClose = () => {
    this.setState({ checkInDetailsModalOpened: false });
  }

  addPieceModalOpen = () => {
    this.setState({ addPieceModalOpened: true });
  }

  addPieceModalClose = () => {
    this.setState({ addPieceModalOpened: false });
  }

  addPieceModalSave = values => {
    const { mutator } = this.props;

    this.addPieceModalClose();
    mutator.ORDER_PIECES.POST(values)
      .then(() => this.callout.current.sendCallout({
        type: 'success',
        message: <FormattedMessage id="ui-orders.checkIn.addPiece.success" />,
      }))
      .catch(() => this.callout.current.sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-orders.checkIn.addPiece.error" />,
      }))
      .then(this.fetchItems);
  }

  render() {
    const { addPieceModalOpened, checkInDetailsModalOpened, isAllChecked, searchText } = this.state;
    const { match: { params: { lineId } }, resources, location } = this.props;
    const initialValuesPiece = {
      poLineId: lineId,
    };
    const items = this.getItems();

    const poLineOrderFormat = get(resources, 'LINE.records.0.orderFormat');
    let showPieceFormatField = false;

    if (!poLineOrderFormat || poLineOrderFormat === PE_MIX) {
      showPieceFormatField = true;
    } else {
      initialValuesPiece.format = ORDER_FORMAT_TO_PIECE_FORMAT[poLineOrderFormat];
    }

    const resultsFormatter = {
      'isChecked': piece => (
        <Checkbox
          checked={piece.isChecked}
          type="checkbox"
          onChange={() => this.toggleItem(piece)}
        />
      ),
      'title': piece => get(piece, 'title', ''),
      'piece': piece => piece.caption,
      'supplement': piece => (
        <Checkbox
          checked={piece.supplement}
          disabled
          type="checkbox"
        />
      ),
      'poLineNumber': piece => piece.poLineNumber,
      'comment': piece => piece.comment,
      'pieceStatus': piece => piece.receivingStatus,
    };
    const pieces = items.filter(item => item.isChecked);
    const isCheckInDisabled = !pieces.length;
    const locations = getLocationsForSelect(resources);

    return (
      <div data-test-check-in-items>
        <Row end="xs">
          <Col data-test-check-in-items-search>
            <SearchField
              marginBottom0
              onChange={this.changeSearchText}
              onClear={this.changeSearchText}
              value={searchText}
            />
          </Col>
          <Col>
            <Button
              buttonStyle="default"
              data-test-check-in-items-add-piece-button
              onClick={this.addPieceModalOpen}
            >
              <FormattedMessage id="ui-orders.checkIn.buttons.addPiece" />
            </Button>
          </Col>
          <Col>
            <Button
              buttonStyle="primary"
              data-test-check-in-items-check-in-button
              disabled={isCheckInDisabled}
              onClick={this.checkInDetailsModalOpen}
            >
              <FormattedMessage id="ui-orders.checkIn.buttons.checkIn" />
            </Button>
          </Col>
        </Row>
        <MultiColumnList
          contentData={items}
          formatter={resultsFormatter}
          visibleColumns={['isChecked', 'title', 'piece', 'supplement', 'poLineNumber', 'comment', 'pieceStatus']}
          columnMapping={{
            isChecked: (
              <Checkbox
                checked={isAllChecked}
                type="checkbox"
                onChange={() => this.toggleAll()}
              />
            ),
            title: <FormattedMessage id="ui-orders.receiving.title" />,
            piece: <FormattedMessage id="ui-orders.checkIn.piece" />,
            supplement: <FormattedMessage id="ui-orders.checkIn.supplement" />,
            poLineNumber: <FormattedMessage id="ui-orders.receiving.poLine" />,
            comment: <FormattedMessage id="ui-orders.checkIn.comment" />,
            pieceStatus: <FormattedMessage id="ui-orders.checkIn.pieceStatus" />,
          }}
          columnWidths={{ isChecked: 35 }}
          onRowClick={(_, item) => this.toggleItem(item)}
        />
        {addPieceModalOpened && (
          <this.connectedAddPieceModal
            close={this.addPieceModalClose}
            initialValues={initialValuesPiece}
            locations={locations}
            onSubmit={this.addPieceModalSave}
            showPieceFormatField={showPieceFormatField}
          />
        )}
        {checkInDetailsModalOpened && (
          <this.connectedCheckInDetails
            close={this.checkInDetailsModalClose}
            location={location}
            pieces={pieces}
          />
        )}
        <Callout ref={this.callout} />
      </div>
    );
  }
}

export default CheckInItems;
