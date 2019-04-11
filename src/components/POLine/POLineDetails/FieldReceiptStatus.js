import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';
import { PO_WORKFLOW_STATUSES } from '../../../common/constants';

export const RECEIPT_STATUS = {
  awaitingReceipt: 'Awaiting Receipt',
  cancelled: 'Cancelled',
  fullyReceived: 'Fully Received',
  partiallyReceived: 'Partially Received',
  pending: 'Pending',
  receiptNotRequired: 'Receipt Not Required',
};

const RECEIPT_STATUSES_BY_ORDER_STATUS = {
  [PO_WORKFLOW_STATUSES.pending]: [
    'pending',
    'receiptNotRequired',
  ],
  [PO_WORKFLOW_STATUSES.open]: [
    'partiallyReceived',
    'receiptNotRequired',
    'fullyReceived',
    'cancelled',
  ],
};

class FieldReceiptStatus extends Component {
  render() {
    const { workflowStatus } = this.props;
    const statuses = RECEIPT_STATUSES_BY_ORDER_STATUS[workflowStatus] || [];

    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.receiptStatus" />}
        name="receiptStatus"
        disabled={!statuses.length}
      >
        <option value="" />
        {statuses.map((key) => (
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

FieldReceiptStatus.propTypes = {
  workflowStatus: PropTypes.string.isRequired,
};

export default FieldReceiptStatus;
