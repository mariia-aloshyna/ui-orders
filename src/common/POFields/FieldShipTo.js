import React from 'react';
import PropTypes from 'prop-types';

import FieldSelection from '../FieldSelection';

const FieldShipTo = ({ addresses }) => {
  return (
    <FieldSelection
      dataOptions={addresses}
      labelId="ui-orders.orderDetails.shipTo"
      name="shipTo"
    />
  );
};

FieldShipTo.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FieldShipTo;
