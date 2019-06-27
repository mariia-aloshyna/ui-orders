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
import { required } from '../../../components/Utils/Validate';

const FieldRenewalDate = ({ disabled }) => {
  return (
    <Field
      backendDateStandard={DATE_FORMAT}
      component={Datepicker}
      dateFormat={DATE_FORMAT}
      fullWidth
      label={<FormattedMessage id="ui-orders.renewals.renewalDate" />}
      name="renewal.renewalDate"
      timeZone={TIMEZONE}
      validate={required}
      disabled={disabled}
    />
  );
};

FieldRenewalDate.propTypes = {
  disabled: PropTypes.bool,
};

FieldRenewalDate.defaultProps = {
  disabled: false,
};

export default FieldRenewalDate;
