import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  get,
  uniqBy,
} from 'lodash';

import {
  Button,
  IconButton,
  MultiColumnList,
  Pane,
  PaneMenu,
  Paneset,
  Row,
  SearchField,
  TextField,
} from '@folio/stripes/components';

import { RECEIVING_API } from '../Utils/api';
import FolioFormattedTime from '../FolioFormattedTime';
import ItemDetails from './ItemDetails';
import css from './ReceivingList.css';

class ReceivingList extends Component {
  static manifest = Object.freeze({
    query: {
      initialValue: {
        query: '',
      },
    },
    receiving_history: {
      type: 'okapi',
      path: RECEIVING_API,
      records: 'receiving_history',
      throwErrors: false,
      GET: {
        params: {
          query: 'purchaseOrderId==:{id}',
        },
      },
    },
  })

  static propTypes = {
    resources: PropTypes.object,
    location: ReactRouterPropTypes.location.isRequired,
    mutator: PropTypes.shape({
      query: PropTypes.shape({
        update: PropTypes.func.isRequired,
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      itemDetails: [],
      isItemDetailsModalOpened: false,
    };
  }

  onCloseReceiving = () => {
    const { location, mutator } = this.props;

    mutator.query.update({
      _path: location.pathname.replace('/receiving', ''),
    });
  }

  getFirstMenu = () => (
    <PaneMenu>
      <FormattedMessage id="ui-orders.buttons.line.close">
        {(title) => (
          <IconButton
            ariaLabel={title}
            icon="times"
            id="clickable-close-new-line-dialog"
            onClick={this.onCloseReceiving}
          />
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  receivingItemsChanged = (value, line, receivingList) => {
    const itemList = receivingList.filter(el => ((el.poLineId === line.poLineId) && (el.receivingStatus === 'Expected')));

    if (itemList.length > value) {
      itemList.length = value;
    }
    if (this.state.itemDetails.length) {
      const updatedList = this.state.itemDetails.filter(el => el.poLineId !== line.poLineId);

      this.setState({ itemDetails: [...updatedList, ...itemList] });
    } else {
      this.setState({ itemDetails: itemList });
    }
  }

  openItemDetailsModal = () => {
    this.setState({ isItemDetailsModalOpened: true });
  }

  closeItemDetailsModal = () => {
    this.setState({ isItemDetailsModalOpened: false });
  }

  render() {
    const { resources } = this.props;
    const receivingList = get(resources, ['receiving_history', 'records'], []);
    const uniqReceivingList = uniqBy(receivingList, 'poLineId');
    const resultsFormatter = {
      'title': line => get(line, 'title', ''),
      'poLineNumber': line => get(line, 'poLineNumber', ''),
      'received': line => {
        const itemsToReceive = receivingList.filter(el => el.poLineId === line.poLineId);
        const receivedItems = itemsToReceive.filter(el => el.receivingStatus === 'Received');

        return `${receivedItems.length}/${itemsToReceive.length}`;
      },
      'dateOrdered': line => <FolioFormattedTime dateString={get(line, 'dateOrdered')} />,
      'receivingItems': line => (
        <TextField
          className={css.receivingField}
          type="number"
          min="1"
          max={receivingList.filter(el => el.poLineId === line.poLineId).length}
          onChange={e => this.receivingItemsChanged(e.target.value, line, receivingList)}
          onClearField={() => this.receivingItemsChanged(0, line, receivingList)}
        />),
      'receivingNote': line => get(line, 'receivingNote', ''),
      'receivingStatus': line => get(line, 'receivingStatus', ''),
    };
    const isReceiveButtonDisabled = this.state.itemDetails.length === 0;

    return (
      <div data-test-receiving>
        <Paneset>
          <Pane
            defaultWidth="fill"
            paneTitle={<FormattedMessage id="ui-orders.receiving.paneTitle" />}
            firstMenu={this.getFirstMenu()}
          >
            <Row
              end="xs"
              className={css.buttonsLineWrapper}
            >
              <div className={css.searchField}>
                <SearchField />
              </div>
              <Button
                buttonStyle="primary"
                onClick={this.onCloseReceiving}
              >
                <FormattedMessage id="ui-orders.receiving.cancelBtn" />
              </Button>
              <Button
                buttonStyle="primary"
              >
                <FormattedMessage id="ui-orders.receiving.receiveAllBtn" />
              </Button>
              <Button
                buttonStyle="primary"
                disabled={isReceiveButtonDisabled}
                onClick={this.openItemDetailsModal}
              >
                <FormattedMessage id="ui-orders.receiving.receiveBtn" />
              </Button>
            </Row>
            <MultiColumnList
              contentData={uniqReceivingList}
              formatter={resultsFormatter}
              visibleColumns={['title', 'poLineNumber', 'received', 'dateOrdered', 'receivingItems', 'receivingNote', 'receivingStatus']}
              columnMapping={{
                title: <FormattedMessage id="ui-orders.receiving.title" />,
                poLineNumber: <FormattedMessage id="ui-orders.receiving.poLine" />,
                received: <FormattedMessage id="ui-orders.receiving.received" />,
                dateOrdered: <FormattedMessage id="ui-orders.receiving.dateOrdered" />,
                receivingItems: <FormattedMessage id="ui-orders.receiving.receivingItems" />,
                receivingNote: <FormattedMessage id="ui-orders.receiving.note" />,
                receivingStatus: <FormattedMessage id="ui-orders.receiving.status" />,
              }}
              columnWidths={{
                receivingItems: '5%',
              }}
            />
            {this.state.isItemDetailsModalOpened && (
              <ItemDetails
                itemList={this.state.itemDetails}
                close={this.closeItemDetailsModal}
              />
            )}
          </Pane>
        </Paneset>
      </div>
    );
  }
}

export default ReceivingList;
