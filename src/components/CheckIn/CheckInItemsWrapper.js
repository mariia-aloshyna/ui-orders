import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import { Callout } from '@folio/stripes/components';

import {
  ITEM_STATUS,
  PIECE_STATUS_EXPECTED,
} from '../Receiving/const';
import {
  CHECKIN,
  LINE,
  LOCATIONS,
  ORDER_PIECES,
  RECEIVING_HISTORY,
} from '../Utils/resources';
import getLocationsForSelect from '../Utils/getLocationsForSelect';
import { LIMIT_MAX } from '../Utils/const';
import CheckInItems from './CheckInItems';
import { checkInItems } from './util';
import CHECKIN_URLS from './const';

class CheckInItemsWrapper extends Component {
  static manifest = Object.freeze({
    checkIn: CHECKIN,
    LINE,
    locations: LOCATIONS,
    ORDER_PIECES,
    query: {},
    RECEIVING_HISTORY,
  })

  static propTypes = {
    mutator: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    stripes: PropTypes.object.isRequired,
    resources: PropTypes.object,
    location: ReactRouterPropTypes.location.isRequired,
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
      query: `checkin == true and receivingStatus==${PIECE_STATUS_EXPECTED} and purchaseOrderId==${id}${lineId ? ` and poLineId==${lineId}` : ''}`,
    };

    mutator.RECEIVING_HISTORY.reset();
    mutator.RECEIVING_HISTORY.GET({ params })
      .then(items => {
        this.setState({ items });
      });
  }

  addPiece = values => {
    const { mutator } = this.props;

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

  checkInItem = (values) => {
    const { mutator, location } = this.props;

    mutator.ORDER_PIECES.POST(values)
      .then((piece) => {
        this.callout.current.sendCallout({
          type: 'success',
          message: <FormattedMessage id="ui-orders.checkIn.addPiece.success" />,
        });

        return piece;
      })
      .then(piece => {
        piece.itemStatus = ITEM_STATUS.received;

        return checkInItems([piece], mutator.checkIn);
      })
      .then(() => mutator.query.update({
        _path: location.pathname.replace(CHECKIN_URLS.items, CHECKIN_URLS.history),
      }))
      .catch(() => this.callout.current.sendCallout({
        type: 'error',
        message: <FormattedMessage id="ui-orders.checkIn.checkInItem.error" />,
      }));
  }

  render() {
    const { items } = this.state;
    const { match: { params: { lineId } }, resources, stripes, location } = this.props;
    const poLineOrderFormat = get(resources, 'LINE.records.0.orderFormat');
    const locations = getLocationsForSelect(resources);

    return (
      <div data-test-check-in-items-wrapper>
        <CheckInItems
          addPiece={this.addPiece}
          checkInItem={this.checkInItem}
          items={items}
          lineId={lineId}
          location={location}
          locations={locations}
          poLineOrderFormat={poLineOrderFormat}
          stripes={stripes}
        />
        <Callout ref={this.callout} />
      </div>
    );
  }
}

export default CheckInItemsWrapper;
