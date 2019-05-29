import React from 'react';

import OrdersSelectionFilter from '../OrdersSelectionFilter';
import {
  getVendorOptions,
} from '../utils';
import { vendorsShape } from '../shapes';

const VendorFilter = ({ vendors, ...rest }) => {
  const options = getVendorOptions(vendors);

  return (
    <OrdersSelectionFilter
      {...rest}
      options={options}
    />
  );
};

VendorFilter.propTypes = {
  vendors: vendorsShape,
};

export default VendorFilter;
