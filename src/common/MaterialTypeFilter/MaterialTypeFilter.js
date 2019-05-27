import React from 'react';
import PropTypes from 'prop-types';

import OrdersSelectionFilter from '../OrdersSelectionFilter';
import { getMaterialTypesOptions } from '../utils';
import { materialTypesShape } from '../shapes';

const MaterialTypeFilter = ({ isElectronic = false, materialTypes, ...rest }) => {
  const options = getMaterialTypesOptions(materialTypes);
  const labelId = isElectronic ? 'filter.materialType.electronic' : 'filter.materialType.physical';

  return (
    <OrdersSelectionFilter
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
