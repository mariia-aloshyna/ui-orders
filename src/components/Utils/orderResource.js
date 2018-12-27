import { cloneDeep } from 'lodash';

const saveOrder = (order, mutator) => {
  delete order.created_by_name;
  delete order.assigned_to_user;
  delete order.vendor_name;

  const method = order.id ? mutator.PUT : mutator.POST;

  return method(order);
};

export const updateOrderResource = (order, mutator, changedProps) => {
  const clonedOrder = cloneDeep(order);

  Object.assign(clonedOrder, changedProps);

  return saveOrder(clonedOrder, mutator);
};

export const createOrderResource = (order, mutator) => {
  const clonedOrder = cloneDeep(order);

  delete clonedOrder.bill_to;
  delete clonedOrder.ship_to;

  return saveOrder(clonedOrder, mutator);
};

export const cloneOrder = (order, mutator, line) => {
  const clonedOrder = cloneDeep(order);

  delete clonedOrder.id;
  delete clonedOrder.adjustment;
  clonedOrder.po_lines = [line];

  return saveOrder(clonedOrder, mutator);
};
