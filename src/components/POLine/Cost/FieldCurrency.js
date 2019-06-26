import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';
import { required } from '../../Utils/Validate';

export const DEFAULT_CURRENCY = 'USD';

const DEFAULT_CURRENCY_OPTIONS = [{ label: DEFAULT_CURRENCY, value: DEFAULT_CURRENCY }];

const FieldCurrency = ({ disabled, currencies = [] }) => {
  const currenciesOptions = currencies.length
    ? currencies.map(v => ({ label: v, value: v }))
    : DEFAULT_CURRENCY_OPTIONS;

  return (
    <Field
      component={Select}
      dataOptions={currenciesOptions}
      placeholder=" "
      fullWidth
      label={<FormattedMessage id="ui-orders.cost.currency" />}
      name="cost.currency"
      required
      validate={[required]}
      disabled={disabled}
    />
  );
};

FieldCurrency.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
};

FieldCurrency.defaultProps = {
  currencies: [],
};

FieldCurrency.displayName = 'FieldCurrency';

export default FieldCurrency;
