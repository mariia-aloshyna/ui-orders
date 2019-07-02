import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelection } from '@folio/stripes-acq-components';

const FieldShipTo = ({ addresses }) => {
  return (
    <FieldSelection
      dataOptions={addresses}
      label={<FormattedMessage id="ui-orders.orderDetails.shipTo" />}
      name="shipTo"
    />
  );
};

FieldShipTo.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FieldShipTo;
