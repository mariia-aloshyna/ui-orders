import React from 'react';
import PropTypes from 'prop-types';

import FieldSelection from '../../FieldSelection';
import { Required } from '../../../components/Utils/Validate';

const FieldAccessProvider = ({ vendors, disabled }) => {
  return (
    <FieldSelection
      dataOptions={vendors}
      labelId="ui-orders.eresource.accessProvider"
      name="eresource.accessProvider"
      required
      validate={[Required]}
      disabled={disabled}
    />
  );
};

FieldAccessProvider.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
};

FieldAccessProvider.defaultProps = {
  disabled: false,
};

export default FieldAccessProvider;
