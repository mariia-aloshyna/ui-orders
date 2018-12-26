import { cloneDeep } from 'lodash';

const createOrder = (order, mutator) => {
  const newOrder = cloneDeep(order);

  delete newOrder.assigned_to_user;
  delete newOrder.created_by_name;
  delete newOrder.vendor_name;
  if (newOrder.id) {
    delete newOrder.adjustment;
    delete newOrder.id;
    delete newOrder.po_lines;

    return mutator.POST(newOrder);
  } else {
    delete newOrder.bill_to;
    delete newOrder.ship_to;

    return mutator.POST(newOrder);
  }
};

export default createOrder;
