import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  ButtonGroup,
} from '@folio/stripes/components';

import CHECKIN_URLS from './const';

const getButtonStyle = (pathname, pathEnding) => {
  return pathname.endsWith(pathEnding)
    ? 'primary'
    : 'default';
};

const CheckInNavigation = ({ pathname, url }) => {
  return (
    <ButtonGroup>
      <Button
        buttonStyle={getButtonStyle(pathname, CHECKIN_URLS.items)}
        marginBottom0
        to={`${url}${CHECKIN_URLS.items}`}
      >
        <FormattedMessage id="ui-orders.checkIn.navigation.items" />
      </Button>
      <Button
        buttonStyle={getButtonStyle(pathname, CHECKIN_URLS.history)}
        marginBottom0
        to={`${url}${CHECKIN_URLS.history}`}
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
