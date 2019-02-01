// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/
import {
  ORDER_NUMBER_API,
  ORDERS_API,
  VENDORS_API,
} from '../../../src/components/Utils/api';

export default function config() {
  this.get(ORDERS_API, (schema) => {
    return schema.orders.all();
  });

  this.get(`${ORDERS_API}/:id`, (schema, request) => {
    return schema.orders.find(request.params.id).attrs;
    // return {
    //   ...schema.orders.find(request.params.id).attrs,
    //   po_lines: [{ cost: { quantity_physical: 2 } }],
    // };
  });

  this.get(VENDORS_API, (schema) => {
    return schema.vendors.all();
  });

  this.get('/fund');
  this.get('/users');
  this.get('/material-types');

  this.get(ORDER_NUMBER_API, () => {
    return { poNumber: '10001' };
  });
}
