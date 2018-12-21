import { cloneDeep } from 'lodash';

const updateOrderResource = (order, mutator, changedProps) => {
  const clonedOrder = cloneDeep(order);

  delete clonedOrder.created_by_name;
  delete clonedOrder.assigned_to_user;
  delete clonedOrder.vendor_name;
  Object.assign(clonedOrder, changedProps);

  return mutator.PUT(clonedOrder);
};

export default updateOrderResource;
