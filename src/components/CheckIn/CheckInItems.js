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
  RECEIVING_HISTORY,
  // ORDER_PIECES,
} from '../Utils/resources';
import { PIECE_STATUS_EXPECTED } from '../Receiving/const';
import { LIMIT_MAX } from '../Utils/const';
// import AddPieceModal from './AddPieceModal';
import CheckInDetails from './CheckInDetails';

class CheckInItems extends Component {
  static manifest = Object.freeze({
    query: {},
    RECEIVING_HISTORY,
    // ORDER_PIECES,
  })

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    mutator: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    // this.connectedAddPieceModal = props.stripes.connect(AddPieceModal);
    this.connectedCheckInDetails = props.stripes.connect(CheckInDetails);
    this.callout = React.createRef();
  }

  state = {
    // addPieceModalOpened: false,
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

  // addPieceModalOpen = () => {
  //   this.setState({ addPieceModalOpened: true });
  // }

  // addPieceModalClose = () => {
  //   this.setState({ addPieceModalOpened: false });
  // }

  // addPieceModalSave = values => {
  //   const { mutator } = this.props;

  //   mutator.ORDER_PIECES.POST(values)
  //     .then(() => this.callout.current.sendCallout({
  //       type: 'success',
  //       message: <FormattedMessage id="ui-orders.checkIn.addPiece.success" />,
  //     }))
  //     .catch(() => this.callout.current.sendCallout({
  //       type: 'error',
  //       message: <FormattedMessage id="ui-orders.checkIn.addPiece.error" />,
  //     }))
  //     .then(this.fetchItems);
  // }

  render() {
    const { searchText, checkInDetailsModalOpened, isAllChecked } = this.state;
    const { location } = this.props;
    // const { match: { params: { lineId } } } = this.props;
    // const initialValuesPiece = {
    //   poLineId: lineId,
    // };
    const items = this.getItems();
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
              // onClick={this.addPieceModalOpen}
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
        {/* {addPieceModalOpened && (
          <this.connectedAddPieceModal
            close={this.addPieceModalClose}
            initialValues={initialValuesPiece}
            onSubmit={this.addPieceModalSave}
          />
        )} */}
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
