import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.orders)) {
      return {
        purchaseOrders: json.orders,
        totalRecords: json.orders.length,
      };
    }

    return json.orders;
  },
});
