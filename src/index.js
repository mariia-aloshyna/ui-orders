/* eslint-disable filenames/match-exported */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesShape } from '@folio/stripes/core';

import Main from './routes/Main';
import OrdersSettings from './settings/OrdersSettings';
import Receiving from './components/Receiving';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class Orders extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match,
    showSettings: PropTypes.bool,
    stripes: stripesShape.isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.connectedApp = props.stripes.connect(Main);
    this.connectedReceiving = props.stripes.connect(Receiving);
  }

  render() {
    if (this.props.showSettings) {
      return <OrdersSettings {...this.props} />;
    }

    const { match: { path }, stripes } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/orders/view/:id/receiving"
          render={props => <this.connectedReceiving {...props} stripes={stripes} />}
        />
        <Route
          path={path}
          render={props => <this.connectedApp {...props} stripes={stripes} />}
        />
      </Switch>
    );
  }
}

export default Orders;
