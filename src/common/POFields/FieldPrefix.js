import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { Select } from '@folio/stripes/components';

import { addEmptyOption } from '../../components/PurchaseOrder/util';

const FieldPrefix = ({ prefixes, disabled }) => {
  return (
    <Field
      component={Select}
      label={<FormattedMessage id="ui-orders.orderDetails.orderNumberPrefix" />}
      name="numberPrefix"
      dataOptions={addEmptyOption(prefixes)}
      disabled={disabled}
    />
  );
};

FieldPrefix.propTypes = {
  prefixes: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
};

FieldPrefix.defaultProps = {
  disabled: false,
};

export default FieldPrefix;
