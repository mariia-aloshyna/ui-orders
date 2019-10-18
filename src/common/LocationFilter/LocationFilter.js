import React from 'react';

import { SelectionFilter } from '@folio/stripes-acq-components';

import {
  getLocationOptions,
} from '../utils';
import { locationsShape } from '../shapes';

const LocationFilter = ({ locations, ...rest }) => {
  const options = getLocationOptions(locations);

  return (
    <SelectionFilter
      {...rest}
      options={options}
    />
  );
};

LocationFilter.propTypes = {
  locations: locationsShape,
};

export default LocationFilter;
