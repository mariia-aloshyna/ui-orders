import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
} from '@folio/stripes/components';

import {
  ITEMS,
  HISTORY,
} from './const';

const getButtonStyle = (pathname, pathEnding) => {
  return pathname.endsWith(pathEnding)
    ? 'primary'
    : 'default';
};

const CheckInNavigation = ({ pathname, url }) => {
  return (
    <ButtonGroup>
      <Button
        buttonStyle={getButtonStyle(pathname, ITEMS)}
        marginBottom0
        to={`${url}${ITEMS}`}
      >
        <FormattedMessage id="ui-orders.checkIn.navigation.items" />
      </Button>
      <Button
        buttonStyle={getButtonStyle(pathname, HISTORY)}
        marginBottom0
        to={`${url}${HISTORY}`}
      >
        <FormattedMessage id="ui-orders.checkIn.navigation.history" />
      </Button>
    </ButtonGroup>
  );
};

CheckInNavigation.propTypes = {
  pathname: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CheckInNavigation;
