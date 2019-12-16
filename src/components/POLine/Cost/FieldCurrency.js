import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { currenciesOptions as allCurrencies } from '@folio/stripes/components';
import { FieldSelect } from '@folio/stripes-acq-components';

export const DEFAULT_CURRENCY = 'USD';

const FieldCurrency = ({ required, disabled, currencies = [] }) => {
  const currenciesOptions = currencies && currencies.length
    ? currencies.map(currencyCode => {
      const currency = allCurrencies.find(({ value }) => value === currencyCode);

      return currency || { label: currencyCode, value: currencyCode };
    })
    : allCurrencies;

  return (
    <FieldSelect
      dataOptions={currenciesOptions}
      label={<FormattedMessage id="ui-orders.cost.currency" />}
      name="cost.currency"
      required={required}
      disabled={disabled}
    />
  );
};

FieldCurrency.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FieldCurrency.defaultProps = {
  currencies: [],
  required: true,
};

FieldCurrency.displayName = 'FieldCurrency';

export default FieldCurrency;
