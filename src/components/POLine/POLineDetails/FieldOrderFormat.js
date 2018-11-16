import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

const ORDER_FORMAT = {
  container: 'Container',
  electronicResource: 'Electronic Resource',
  PEMix: 'P/E Mix',
  physicalResource: 'Physical Resource',
  service: 'Service',
};

class FieldOrderFormat extends Component {
  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.orderFormat" />}
        name="order_format"
        validate={[Required]}
      >
        <FormattedMessage id="ui-orders.dropdown.select">
          {(message) => <option value="">{message}</option>}
        </FormattedMessage>
        {Object.keys(ORDER_FORMAT).map((key) => (
          <FormattedMessage
            id={`ui-orders.order_format.${key}`}
            key={key}
          >
            {(message) => <option value={ORDER_FORMAT[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

export default FieldOrderFormat;
