import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import {
  Button,
  Col,
  Row,
  SearchField,
} from '@folio/stripes/components';

import {
  ERESOURCE,
  PE_MIX,
  PHYSICAL,
} from '../POLine/const';
import CheckInDetails from './CheckInDetails';
import PiecesList from './PiecesList';
import AddPieceModal from './AddPieceModal';
import { PIECE_FORMAT } from './FieldPieceFormat';
import withCheckboxes from './withCheckboxes';

const ORDER_FORMAT_TO_PIECE_FORMAT = {
  [ERESOURCE]: PIECE_FORMAT.electronic,
  [PHYSICAL]: PIECE_FORMAT.physical,
};

class CheckInItems extends Component {
  static propTypes = {
    addPiece: PropTypes.func.isRequired,
    checkedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    checkedItemsMap: PropTypes.object.isRequired,
    checkInItem: PropTypes.func.isRequired,
    isAllChecked: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    stripes: PropTypes.object.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    poLine: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.connectedAddPieceModal = props.stripes.connect(AddPieceModal);
    this.connectedCheckInDetails = props.stripes.connect(CheckInDetails);
  }

  state = {
    addPieceModalOpened: false,
    checkInDetailsModalOpened: false,
    searchText: '',
  };

  getItems = () => {
    const { searchText } = this.state;
    const { items } = this.props;

    return searchText
      ? items.filter(item => item.title.toLocaleLowerCase().includes(searchText))
      : items;
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
    const { addPiece } = this.props;

    this.addPieceModalClose();
    addPiece(values);
  }

  addPieceModalCheckIn = values => {
    const { checkInItem } = this.props;

    this.addPieceModalClose();
    checkInItem(values);
  }

  getCreateInventoryValues = () => {
    const { poLine } = this.props;

    return {
      'Physical': get(poLine, 'physical.createInventory'),
      'Electronic': get(poLine, 'eresource.createInventory'),
    };
  }

  render() {
    const { addPieceModalOpened, checkInDetailsModalOpened, searchText } = this.state;
    const {
      checkedItems,
      checkedItemsMap,
      isAllChecked,
      location,
      locations,
      poLine,
      stripes,
      toggleAll,
      toggleItem,
    } = this.props;

    if (!poLine) {
      return null;
    }

    const { orderFormat, id: poLineId } = poLine;
    const initialValuesPiece = {
      poLineId,
    };
    const items = this.getItems();

    let showPieceFormatField = false;

    if (!orderFormat || orderFormat === PE_MIX) {
      showPieceFormatField = true;
    } else {
      initialValuesPiece.format = ORDER_FORMAT_TO_PIECE_FORMAT[orderFormat];
    }

    const isCheckInDisabled = !checkedItems.length;

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
        <PiecesList
          checkedItemsMap={checkedItemsMap}
          isAllChecked={isAllChecked}
          items={items}
          toggleAll={toggleAll}
          toggleItem={toggleItem}
        />
        {addPieceModalOpened && (
          <this.connectedAddPieceModal
            checkIn={this.addPieceModalCheckIn}
            close={this.addPieceModalClose}
            createInventoryValues={this.getCreateInventoryValues()}
            initialValues={initialValuesPiece}
            locations={locations}
            onSubmit={this.addPieceModalSave}
            showPieceFormatField={showPieceFormatField}
            stripes={stripes}
          />
        )}
        {checkInDetailsModalOpened && (
          <this.connectedCheckInDetails
            close={this.checkInDetailsModalClose}
            location={location}
            pieces={checkedItems}
          />
        )}
      </div>
    );
  }
}

export default withCheckboxes(CheckInItems);
