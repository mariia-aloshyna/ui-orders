import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelection } from '@folio/stripes-acq-components';

const FieldMaterialSupplier = ({ vendors, disabled }) => {
  return (
    <FieldSelection
      dataOptions={vendors}
      label={<FormattedMessage id="ui-orders.physical.materialSupplier" />}
      name="physical.materialSupplier"
      disabled={disabled}
    />
  );
};

FieldMaterialSupplier.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
};

FieldMaterialSupplier.defaultProps = {
  disabled: false,
};

export default FieldMaterialSupplier;
