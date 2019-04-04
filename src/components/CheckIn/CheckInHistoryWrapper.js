import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';

import { Callout } from '@folio/stripes/components';

import { PIECE_STATUS_RECEIVED } from '../Receiving/const';
import {
  RECEIVE,
  RECEIVING_HISTORY,
} from '../Utils/resources';
import { LIMIT_MAX } from '../Utils/const';
import CheckInHistory from './CheckInHistory';
import { removePiecesFromHistory } from '../Receiving/util';

class CheckInHistoryWrapper extends Component {
  static manifest = Object.freeze({
    query: {},
    receive: RECEIVE,
    RECEIVING_HISTORY,
  })

  static propTypes = {
    mutator: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.callout = React.createRef();
  }

  state = {
    items: [],
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    const { mutator, match: { params: { id, lineId } } } = this.props;
    const params = {
      limit: LIMIT_MAX,
      query: `checkin == true and receivingStatus==${PIECE_STATUS_RECEIVED} and purchaseOrderId==${id}${lineId ? ` and poLineId==${lineId}` : ''}`,
    };

    mutator.RECEIVING_HISTORY.reset();
    mutator.RECEIVING_HISTORY.GET({ params })
      .then(items => {
        this.setState({ items });
      });
  }

  removePieces = (pieces = []) => {
    removePiecesFromHistory(pieces, this.props.mutator.receive)
      .then(() => this.callout.current.sendCallout({
        type: 'success',
        message: <FormattedMessage id="ui-orders.receivingHistory.remove.success" />,
      }))
      .catch(() => this.callout.current.sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-orders.receivingHistory.remove.error" />,
      }))
      .then(this.fetchItems);
  }

  render() {
    const { items } = this.state;

    return (
      <div data-test-check-in-history-wrapper>
        <CheckInHistory
          items={items}
          removePieces={this.removePieces}
        />
        <Callout ref={this.callout} />
      </div>
    );
  }
}

export default CheckInHistoryWrapper;
