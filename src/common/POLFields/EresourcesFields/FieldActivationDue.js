import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import moment from 'moment';

import {
  Datepicker,
} from '@folio/stripes/components';

import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../../components/Utils/const';

const FieldActivationDue = ({ created }) => {
  return (
    <Field
      backendDateStandard={DATE_FORMAT}
      component={Datepicker}
      dateFormat={DATE_FORMAT}
      format={(value) => {
        return Number.isInteger(value)
          ? moment.utc(created).add(value, 'days').format(DATE_FORMAT)
          : '';
      }}
      normalize={(value) => {
        return value
          ? moment.utc(value).diff(moment(created), 'days') + 1
          : undefined;
      }}
      fullWidth
      label={<FormattedMessage id="ui-orders.eresource.activationDue" />}
      name="eresource.activationDue"
      timeZone={TIMEZONE}
    />
  );
};

FieldActivationDue.propTypes = {
  created: PropTypes.string,
};

FieldActivationDue.defaultProps = {
  created: '',
};

export default FieldActivationDue;
