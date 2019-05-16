import React from 'react';
import { FormattedMessage } from 'react-intl';

import { WORKFLOW_STATUS } from '../components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { RECEIPT_STATUS } from '../components/POLine/POLineDetails/FieldReceiptStatus';

export const FILTERS = {
  STATUS: 'workflowStatus',
  ASSIGNED_TO: 'assignedTo',
  RECEIPT_STATUS: 'receiptStatus',
  DATE_ORDERED: 'dateOrdered',
};

export const STATUS_FILTER_OPTIONS = Object.keys(WORKFLOW_STATUS).map(status => ({
  value: WORKFLOW_STATUS[status],
  label: <FormattedMessage id={`ui-orders.workflowStatus.${status}`} />,
}));

export const RECEIPT_STATUS_FILTER_OPTIONS = Object.keys(RECEIPT_STATUS).map(status => ({
  value: RECEIPT_STATUS[status],
  label: <FormattedMessage id={`ui-orders.receipt_status.${status}`} />,
}));
