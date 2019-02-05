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
          query: 'purchase_order_id==:{id}',
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
            aria-label={<FormattedMessage id="ui-orders.buttons.line.closeDialog" />}
            icon="times"
            id="clickable-close-new-line-dialog"
            onClick={this.onCloseReceiving}
            title={title}
          />
        )}
      </FormattedMessage>
    </PaneMenu>
  );

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
      'receivingItems': () => <TextField type="number" />,
      'receivingNote': line => get(line, 'receivingNote', ''),
      'receivingStatus': line => get(line, 'receivingStatus', ''),
    };

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
          </Pane>
        </Paneset>
      </div>
    );
  }
}

export default ReceivingList;
