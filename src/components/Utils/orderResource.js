import { cloneDeep } from 'lodash';

const saveOrder = (order, mutator) => {
  let method = mutator.POST;

  delete order.created_by_name;
  delete order.assigned_to_user;
  delete order.vendor_name;
  delete order.bill_to;
  delete order.ship_to;
  delete order.numberPrefix;
  delete order.numberSuffix;

  if (order.id) {
    method = mutator.PUT;
    delete order.po_lines;
  }

  return method(order);
};

export const updateOrderResource = (order, mutator, changedProps) => {
  const clonedOrder = cloneDeep(order);

  Object.assign(clonedOrder, changedProps);

  return saveOrder(clonedOrder, mutator);
};

export const createOrderResource = (order, mutator) => {
  const clonedOrder = cloneDeep(order);
  const { numberPrefix = '', numberSuffix = '', po_number: orderNumber = '' } = clonedOrder;
  const fullOrderNumber = `${numberPrefix}${orderNumber}${numberSuffix}`.trim();

  clonedOrder.po_number = fullOrderNumber || undefined;

  return saveOrder(clonedOrder, mutator);
};

export const cloneOrder = (order, mutator, line) => {
  const clonedOrder = cloneDeep(order);

  delete clonedOrder.id;
  delete clonedOrder.adjustment;
  delete clonedOrder.po_number;
  delete clonedOrder.workflow_status;
  if (line) {
    delete line.purchase_order_id;
    clonedOrder.po_lines = [line];
  } else {
    delete clonedOrder.po_lines;
  }

  return saveOrder(clonedOrder, mutator);
};
