import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Pane,
} from '@folio/stripes/components';

const lastMenu = (
  <Button
    buttonStyle="primary paneHeaderNewButton"
    marginBottom0
  >
    <FormattedMessage id="ui-orders.settings.newBtn" />
  </Button>
);

const OrderTemplates = ({ label }) => (
  <Pane
    lastMenu={lastMenu}
    paneTitle={label}
  />
);

OrderTemplates.propTypes = {
  label: PropTypes.object.isRequired,
};

OrderTemplates.displayName = 'OrderTemplates';

export default OrderTemplates;
