import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Route } from 'react-router-dom';

import {
  Col,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
  Row,
} from '@folio/stripes/components';
import { stripesConnect, stripesShape } from '@folio/stripes/core';

import { ORDER } from '../Utils/resources';
import CheckInItemsWrapper from './CheckInItemsWrapper';
import CheckInHistoryWrapper from './CheckInHistoryWrapper';
import CheckInNavigation from './CheckInNavigation';
import { CHECKIN_URLS } from './const';

class CheckIn extends Component {
  static manifest = Object.freeze({
    query: {},
    order: ORDER,
  });

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    match: ReactRouterPropTypes.match,
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object,
    stripes: stripesShape.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.connectedCheckInItems = props.stripes.connect(CheckInItemsWrapper);
    this.connectedCheckInHistory = props.stripes.connect(CheckInHistoryWrapper);
  }

  onClose = () => {
    const { location, mutator } = this.props;
    const pathEnding = location.pathname.endsWith(CHECKIN_URLS.items)
      ? CHECKIN_URLS.items
      : CHECKIN_URLS.history;

    mutator.query.replace({
      _path: location.pathname.replace(`/check-in${pathEnding}`, ''),
    });
  }

  getFirstMenu = () => (
    <PaneMenu>
      <FormattedMessage id="ui-orders.buttons.line.close">
        {(title) => (
          <IconButton
            ariaLabel={title}
            data-test-close-button
            icon="times"
            onClick={this.onClose}
          />
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  render() {
    const { match, resources, stripes, location } = this.props;
    const orderNumber = get(resources, ['order', 'records', 0, 'poNumber'], '');

    return (
      <Paneset>
        <Pane
          defaultWidth="fill"
          paneTitle={(
            <FormattedMessage
              id="ui-orders.checkIn.paneTitle"
              values={{ orderNumber }}
            />
          )}
          firstMenu={this.getFirstMenu()}
        >
          <Row center="xs">
            <Col xs>
              <CheckInNavigation
                pathname={location.pathname}
                url={match.url}
              />
            </Col>
          </Row>
          <Route
            path={`${match.path}/items`}
            render={props => <this.connectedCheckInItems {...props} stripes={stripes} />}
          />
          <Route
            path={`${match.path}/history`}
            render={props => <this.connectedCheckInHistory {...props} stripes={stripes} />}
          />
        </Pane>
      </Paneset>
    );
  }
}

export default stripesConnect(CheckIn);
