import React from 'react';
import PropTypes from 'prop-types';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { getMaterialTypesOptions } from '../utils';
import { materialTypesShape } from '../shapes';

const MaterialTypeFilter = ({ isElectronic = false, materialTypes, ...rest }) => {
  const options = getMaterialTypesOptions(materialTypes);
  const labelId = isElectronic ? 'ui-orders.filter.materialType.electronic' : 'ui-orders.filter.materialType.physical';

  return (
    <SelectionFilter
      {...rest}
      labelId={labelId}
      options={options}
    />
  );
};

MaterialTypeFilter.propTypes = {
  isElectronic: PropTypes.bool,
  materialTypes: materialTypesShape,
};

export default MaterialTypeFilter;
