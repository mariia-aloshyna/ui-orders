import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelection } from '@folio/stripes-acq-components';

import { Required } from '../../../components/Utils/Validate';

const FieldAccessProvider = ({ vendors, disabled, required }) => {
  return (
    <FieldSelection
      dataOptions={vendors}
      label={<FormattedMessage id="ui-orders.eresource.accessProvider" />}
      name="eresource.accessProvider"
      required={required}
      validate={required && [Required]}
      disabled={disabled}
    />
  );
};

FieldAccessProvider.propTypes = {
  vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FieldAccessProvider.defaultProps = {
  disabled: false,
  required: true,
};

export default FieldAccessProvider;
