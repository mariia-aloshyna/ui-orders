import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { TextField } from '@folio/stripes/components';
import { validateRequired } from '@folio/stripes-acq-components';

const FieldRenewalInterval = ({ required, disabled }) => {
  return (
    <Field
      component={TextField}
      fullWidth
      label={<FormattedMessage id="ui-orders.renewals.renewalInterval" />}
      name="renewal.interval"
      type="number"
      required={required}
      validate={required && validateRequired}
      disabled={disabled}
    />
  );
};

FieldRenewalInterval.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FieldRenewalInterval.defaultProps = {
  disabled: false,
  required: true,
};

export default FieldRenewalInterval;
