import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import { Callout } from '@folio/stripes/components';

import { PIECE_STATUS_EXPECTED } from '../Receiving/const';
import {
  LINE,
  LOCATIONS,
  ORDER_PIECES,
  RECEIVING_HISTORY,
} from '../Utils/resources';
import getLocationsForSelect from '../Utils/getLocationsForSelect';
import { LIMIT_MAX } from '../Utils/const';
import CheckInItems from './CheckInItems';

class CheckInItemsWrapper extends Component {
  static manifest = Object.freeze({
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

  render() {
    const { items } = this.state;
    const { match: { params: { lineId } }, resources, stripes, location } = this.props;
    const poLineOrderFormat = get(resources, 'LINE.records.0.orderFormat');
    const locations = getLocationsForSelect(resources);

    return (
      <div data-test-check-in-items-wrapper>
        <CheckInItems
          addPiece={this.addPiece}
          items={items}
          poLineOrderFormat={poLineOrderFormat}
          locations={locations}
          stripes={stripes}
          lineId={lineId}
          location={location}
        />
        <Callout ref={this.callout} />
      </div>
    );
  }
}

export default CheckInItemsWrapper;
