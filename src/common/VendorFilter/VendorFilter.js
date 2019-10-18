import React from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import {
  getVendorOptions,
} from '../utils';
import { vendorsShape } from '../shapes';

const VendorFilter = ({ vendors, ...rest }) => {
  const options = getVendorOptions(vendors);

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
};

VendorFilter.propTypes = {
  vendors: vendorsShape,
};

export default VendorFilter;
