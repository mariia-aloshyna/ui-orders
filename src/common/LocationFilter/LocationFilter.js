import React from 'react';

import OrdersSelectionFilter from '../OrdersSelectionFilter';
import {
  getLocationOptions,
} from '../utils';
import { locationsShape } from '../shapes';

const LocationFilter = ({ locations, ...rest }) => {
  const options = getLocationOptions(locations);

  return (
    <OrdersSelectionFilter
      {...rest}
      options={options}
    />
  );
};

LocationFilter.propTypes = {
  locations: locationsShape,
};

export default LocationFilter;
