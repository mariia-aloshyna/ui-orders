import { some } from 'lodash';

import { WORKFLOW_STATUS } from './Summary/FieldWorkflowStatus';
import { RECEIPT_STATUS } from '../POLine/POLineDetails/FieldReceiptStatus';

const isLineAbleToBeReceived = (line = { cost: {} }) => {
  const isNotCheckin = !line.checkin_items;
  const hasQuantity = Boolean(line.cost.quantity_physical || line.cost.quantity_electronic);
  const hasCorrectReceiptStatus = !([
    RECEIPT_STATUS.pending,
    RECEIPT_STATUS.receiptNotRequired,
  ].includes(line.receipt_status));

  return isNotCheckin && hasQuantity && hasCorrectReceiptStatus;
};

const isWorkflowStatusOpen = (order) => {
  const { workflow_status: workflowStatus } = order;

  return workflowStatus === WORKFLOW_STATUS.open;
};

export const isReceiveAvailableForLine = (line = {}, order = {}) => {
  const hasLineItemsToReceive = isLineAbleToBeReceived(line);

  return hasLineItemsToReceive && isWorkflowStatusOpen(order);
};

export const isReceiveAvailableForOrder = (order = {}) => {
  const { compositePoLines = [] } = order;
  const hasLineItemsToReceive = some(compositePoLines, isLineAbleToBeReceived);

  return hasLineItemsToReceive && isWorkflowStatusOpen(order);
};

const EMPTY_OPTION = {
  label: '',
  value: '',
};

export const addEmptyOption = (options = []) => [EMPTY_OPTION, ...options];
