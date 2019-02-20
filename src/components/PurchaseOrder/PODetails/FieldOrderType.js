import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

export const ORDER_TYPE = {
  oneTime: 'One-Time',
  ongoing: 'Ongoing',
};

class FieldOrderType extends Component {
  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.orderDetails.orderType" />}
        name="order_type"
        required
        validate={[Required]}
      >
        <FormattedMessage id="ui-orders.dropdown.select">
          {(message) => <option value="">{message}</option>}
        </FormattedMessage>
        {Object.keys(ORDER_TYPE).map((key) => (
          <FormattedMessage
            id={`ui-orders.order_type.${key}`}
            key={key}
          >
            {(message) => <option value={ORDER_TYPE[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

export default FieldOrderType;
