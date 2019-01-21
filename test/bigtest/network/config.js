// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';

export default function config() {
  this.get(ORDERS_API, (schema, request) => {
    return schema.orders.all();
  });

  this.get(`${ORDERS_API}/:id`, (schema, request) => {
    return schema.orders.find(request.params.id).attrs;
  });

  this.get('/vendor');
  this.get('/fund');
  this.get('/users');
  this.get('/material-types');
}
