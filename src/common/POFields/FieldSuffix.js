import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { Select } from '@folio/stripes/components';

import { addEmptyOption } from '../../components/PurchaseOrder/util';

const FieldSuffix = ({ suffixes, disabled }) => {
  return (
    <Field
      component={Select}
      label={<FormattedMessage id="ui-orders.orderDetails.orderNumberSuffix" />}
      name="numberSuffix"
      dataOptions={addEmptyOption(suffixes)}
      disabled={disabled}
    />
  );
};

FieldSuffix.propTypes = {
  suffixes: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
};

FieldSuffix.defaultProps = {
  disabled: false,
};

export default FieldSuffix;
