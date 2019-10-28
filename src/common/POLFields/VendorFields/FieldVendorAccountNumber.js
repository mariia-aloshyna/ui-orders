import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { TextField } from '@folio/stripes/components';
import {
  FieldSelect,
  fieldSelectOptionsShape,
} from '@folio/stripes-acq-components';

const FieldVendorAccountNumber = ({ accounts, disabled }) => {
  return (
    accounts.length
      ? (
        <FieldSelect
          dataOptions={accounts}
          fullWidth
          label={<FormattedMessage id="ui-orders.vendor.accountNumber" />}
          name="vendorDetail.vendorAccount"
          disabled={disabled}
        />
      )
      : (
        <Field
          component={TextField}
          fullWidth
          label={<FormattedMessage id="ui-orders.vendor.accountNumber" />}
          name="vendorDetail.vendorAccount"
        />
      )
  );
};

FieldVendorAccountNumber.propTypes = {
  accounts: fieldSelectOptionsShape,
  disabled: PropTypes.bool,
};

FieldVendorAccountNumber.defaultProps = {
  accounts: [],
};

export default FieldVendorAccountNumber;
