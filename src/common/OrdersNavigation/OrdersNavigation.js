import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  ButtonGroup,
  Button,
} from '@folio/stripes/components';

const OrdersNavigation = ({ isOrders, isOrderLines }) => (
  <ButtonGroup
    fullWidth
    data-test-orders-navigation
  >
    <Button
      to="/orders?sort=poNumber"
      buttonStyle={`${isOrders ? 'primary' : 'default'}`}
    >
      <FormattedMessage id="ui-orders.navigation.orders" />
    </Button>
    <Button
      to="/orders/lines"
      buttonStyle={`${isOrderLines ? 'primary' : 'default'}`}
      data-test-orders-navigation-lines
    >
      <FormattedMessage id="ui-orders.navigation.orderLines" />
    </Button>
  </ButtonGroup>
);

OrdersNavigation.propTypes = {
  isOrders: PropTypes.bool,
  isOrderLines: PropTypes.bool,
};

OrdersNavigation.defaultProps = {
  isOrders: false,
  isOrderLines: false,
};

export default OrdersNavigation;
