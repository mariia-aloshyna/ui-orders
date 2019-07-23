import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Datepicker,
} from '@folio/stripes/components';

import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../../components/Utils/const';
import { Required } from '../../../components/Utils/Validate';

const FieldRenewalDate = ({ required, disabled }) => {
  return (
    <Field
      backendDateStandard={DATE_FORMAT}
      component={Datepicker}
      dateFormat={DATE_FORMAT}
      fullWidth
      label={<FormattedMessage id="ui-orders.renewals.renewalDate" />}
      name="renewal.renewalDate"
      timeZone={TIMEZONE}
      required={required}
      validate={required && Required}
      disabled={disabled}
    />
  );
};

FieldRenewalDate.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FieldRenewalDate.defaultProps = {
  disabled: false,
  required: true,
};

export default FieldRenewalDate;
