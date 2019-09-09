/* eslint-disable filenames/match-exported */
import React from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { hot } from 'react-hot-loader';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesShape } from '@folio/stripes/core';

import OrdersList from './OrdersList';
import OrderLinesList from './OrderLinesList';
import OrdersSettings from './settings/OrdersSettings';
import {
  RECEIVING_HISTORY,
  RECEIVING_ITEMS,
  ReceivingHistory,
  ReceivingList,
} from './components/Receiving';
import CheckIn from './components/CheckIn/CheckIn';
import { ORDER_LINES_ROUTE } from './common/constants';

const ORDER_DETAIL_URL = '/orders/view/:id';
const LINE_DETAIL_URL = `${ORDER_DETAIL_URL}/po-line/view/:lineId`;

const Orders = ({ match, location, showSettings }) => {
  if (showSettings) {
    return <OrdersSettings {...{ match, location }} />;
  }

  const { path } = match;

  return (
    <Switch>
      <Route
        path={`${LINE_DETAIL_URL}/check-in`}
        component={CheckIn}
      />
      <Route
        exact
        path={`${LINE_DETAIL_URL}${RECEIVING_HISTORY}`}
        component={ReceivingHistory}
      />
      <Route
        exact
        path={`${LINE_DETAIL_URL}${RECEIVING_ITEMS}`}
        component={ReceivingList}
      />
      <Route
        exact
        path={`${ORDER_DETAIL_URL}${RECEIVING_HISTORY}`}
        component={ReceivingHistory}
      />
      <Route
        exact
        path={`${ORDER_DETAIL_URL}${RECEIVING_ITEMS}`}
        component={ReceivingList}
      />
      <Route
        path={ORDER_LINES_ROUTE}
        component={OrderLinesList}
      />
      <Route
        path={path}
        component={OrdersList}
      />
    </Switch>
  );
};

Orders.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  showSettings: PropTypes.bool,
  stripes: stripesShape.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default hot(module)(Orders);
