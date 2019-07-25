import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelection } from '@folio/stripes-acq-components';

import { Required } from '../../components/Utils/Validate';

const FieldVendor = ({ vendors, disabled, required }) => {
  return (
    <FieldSelection
      dataOptions={vendors}
      label={<FormattedMessage id="ui-orders.orderDetails.vendor" />}
      name="vendor"
      required={required}
      validate={required && [Required]}
      disabled={disabled}
    />
  );
};

FieldVendor.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FieldVendor.defaultProps = {
  disabled: false,
  required: true,
};

export default FieldVendor;
