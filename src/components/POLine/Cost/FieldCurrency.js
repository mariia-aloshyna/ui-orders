import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

export const CURRENCY = {
  usd: 'USD',
};

const FieldCurrency = () => (
  <Field
    component={Select}
    fullWidth
    label={<FormattedMessage id="ui-orders.cost.currency" />}
    name="cost.currency"
    required
    validate={[Required]}
  >
    <FormattedMessage id="ui-orders.dropdown.select">
      {(message) => <option value="">{message}</option>}
    </FormattedMessage>
    {Object.keys(CURRENCY).map((key) => (
      <FormattedMessage
        id={`ui-orders.cost.currency.${key}`}
        key={key}
      >
        {(message) => <option value={CURRENCY[key]}>{message}</option>}
      </FormattedMessage>
    ))}
  </Field>
);

FieldCurrency.displayName = 'FieldCurrency';

export default FieldCurrency;
