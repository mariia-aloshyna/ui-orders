import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { stripesShape } from '@folio/stripes/core';

import OrderLineDetails from './OrderLineDetails';

class Details extends Component {
  static propTypes = {
    parentMutator: PropTypes.object.isRequired,
    parentResources: PropTypes.object.isRequired,
    match: ReactRouterPropTypes.match,
    stripes: stripesShape.isRequired,
  }

  constructor(props) {
    super(props);

    this.connectedOrderLineDetails = props.stripes.connect(OrderLineDetails);
  }

  render() {
    const { match: { path } } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={path}
          render={
            props => {
              return (
                <this.connectedOrderLineDetails
                  {...this.props}
                  {...props}
                />
              );
            }
          }
        />
      </Switch>
    );
  }
}

export default Details;
