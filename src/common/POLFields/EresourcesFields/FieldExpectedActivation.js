import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Datepicker,
} from '@folio/stripes/components';

import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../../components/Utils/const';

const FieldExpectedActivation = () => {
  return (
    <Field
      backendDateStandard={DATE_FORMAT}
      component={Datepicker}
      dateFormat={DATE_FORMAT}
      label={<FormattedMessage id="ui-orders.eresource.expectedActivation" />}
      name="eresource.expectedActivation"
      timeZone={TIMEZONE}
    />
  );
};

export default FieldExpectedActivation;
