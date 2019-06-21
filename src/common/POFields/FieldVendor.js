import React from 'react';
import PropTypes from 'prop-types';

import FieldSelection from '../FieldSelection';

const FieldVendor = ({ vendors }) => {
  return (
    <FieldSelection
      dataOptions={vendors}
      labelId="ui-orders.orderDetails.vendor"
      name="vendorName"
    />
  );
};

FieldVendor.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FieldVendor;
