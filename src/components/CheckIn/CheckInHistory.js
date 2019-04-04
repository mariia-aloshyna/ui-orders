import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  Button,
  Col,
  ConfirmationModal,
  Row,
  SearchField,
} from '@folio/stripes/components';

import PiecesList from './PiecesList';
import withCheckboxes from './withCheckboxes';

class CheckInHistory extends Component {
  static propTypes = {
    checkedItems: PropTypes.arrayOf(PropTypes.object),
    checkedItemsMap: PropTypes.object.isRequired,
    isAllChecked: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    removePieces: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
  }

  state = {
    confirming: false,
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

  showConfirm = () => {
    this.setState({ confirming: true });
  }

  hideConfirm = () => {
    this.setState({ confirming: false });
  }

  handleSubmit = () => {
    const { checkedItems, removePieces } = this.props;

    this.hideConfirm();
    removePieces(checkedItems);
  }

  render() {
    const { confirming, searchText } = this.state;
    const { checkedItems, checkedItemsMap, isAllChecked, toggleAll, toggleItem } = this.props;
    const items = this.getItems();
    const isRemoveDisabled = !checkedItems.length;

    return (
      <div data-test-check-in-history>
        <Row end="xs">
          <Col data-test-check-in-history-search>
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
              data-test-check-in-remove
              disabled={isRemoveDisabled}
              marginBottom0
              onClick={this.showConfirm}
            >
              <FormattedMessage id="ui-orders.receiving.btn.remove" />
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
        {confirming && (
          <ConfirmationModal
            confirmLabel={<FormattedMessage id="ui-orders.receivingHistory.confirmation.confirm" />}
            heading={<FormattedMessage id="ui-orders.receivingHistory.confirmation.heading" />}
            message={<FormattedMessage id="ui-orders.checkIn.history.confirmation.message" />}
            onCancel={this.hideConfirm}
            onConfirm={this.handleSubmit}
            open
          />
        )}
      </div>
    );
  }
}

export default withCheckboxes(CheckInHistory);
