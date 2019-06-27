import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { TextField } from '@folio/stripes/components';

import { required } from '../../../components/Utils/Validate';

const FieldRenewalInterval = ({ disabled }) => {
  return (
    <Field
      component={TextField}
      fullWidth
      label={<FormattedMessage id="ui-orders.renewals.renewalInterval" />}
      name="renewal.interval"
      type="number"
      validate={required}
      disabled={disabled}
    />
  );
};

FieldRenewalInterval.propTypes = {
  disabled: PropTypes.bool,
};

FieldRenewalInterval.defaultProps = {
  disabled: false,
};

export default FieldRenewalInterval;
