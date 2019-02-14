import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';

export const RECEIPT_STATUS = {
  awaitingReceipt: 'Awaiting Receipt',
  cancelled: 'Cancelled',
  fullyReceived: 'Fully Received',
  partiallyReceived: 'Partially Received',
  pending: 'Pending',
  receiptNotRequired: 'Receipt Not Required',
};

class FieldReceiptStatus extends Component {
  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.receiptStatus" />}
        name="receipt_status"
      >
        <FormattedMessage id="ui-orders.dropdown.select">
          {(message) => <option value="">{message}</option>}
        </FormattedMessage>
        {Object.keys(RECEIPT_STATUS).map((key) => (
          <FormattedMessage
            id={`ui-orders.receipt_status.${key}`}
            key={key}
          >
            {(message) => <option value={RECEIPT_STATUS[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

export default FieldReceiptStatus;
