import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';
import { PO_WORKFLOW_STATUSES } from '../../../common/constants';

export const PAYMENT_STATUS = {
  awaitingPayment: 'Awaiting Payment',
  cancelled: 'Cancelled',
  fullyPaid: 'Fully Paid',
  partiallyPaid: 'Partially Paid',
  paymentNotRequired: 'Payment Not Required',
  pending: 'Pending',
};

const PAYMENT_STATUSES_BY_ORDER_STATUS = {
  [PO_WORKFLOW_STATUSES.pending]: [
    'pending',
    'paymentNotRequired',
  ],
  [PO_WORKFLOW_STATUSES.open]: [
    'partiallyPaid',
    'paymentNotRequired',
    'fullyPaid',
    'cancelled',
  ],
};

class FieldPaymentStatus extends Component {
  render() {
    const { workflowStatus } = this.props;
    const statuses = PAYMENT_STATUSES_BY_ORDER_STATUS[workflowStatus] || [];

    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.paymentStatus" />}
        name="paymentStatus"
        disabled={!statuses.length}
      >
        <option value="" />
        {statuses.map((key) => (
          <FormattedMessage
            id={`ui-orders.payment_status.${key}`}
            key={key}
          >
            {(message) => <option value={PAYMENT_STATUS[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

FieldPaymentStatus.propTypes = {
  workflowStatus: PropTypes.string.isRequired,
};

export default FieldPaymentStatus;
