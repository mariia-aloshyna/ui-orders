// typical mirage config export
// http://www.ember-cli-mirage.com/docs/v0.4.x/configuration/
import { noop } from 'lodash';
import {
  ITEMS_API,
  LINES_API,
  ORDER_NUMBER_API,
  ORDERS_API,
  RECEIVING_API,
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
    //   poLines: [{ cost: { quantityPhysical: 2 } }],
    // };
  });

  this.put(`${ORDERS_API}/:id`, noop);

  this.get(VENDORS_API, (schema) => {
    return schema.vendors.all();
  });

  this.get('/fund');
  this.get('/users');
  this.get('/material-types');

  this.get(ORDER_NUMBER_API, () => {
    return { poNumber: '10001' };
  });

  this.get(LINES_API, (schema) => {
    return schema.lines.all();
  });

  this.get(`${LINES_API}/:id`, (schema, request) => {
    return schema.lines.find(request.params.id).attrs;
  });

  this.get('/locations');

  this.get('/configurations/entries', (_, { queryParams }) => {
    if (queryParams && queryParams.query === '(module=ORDERS and configName=orderNumber)') {
      return {
        configs: [{
          id: '7c7c5a09-d465-4642-889a-8a0b351d7b15',
          module: 'ORDERS',
          configName: 'orderNumber',
          enabled: true,
          value: '{"canUserEditOrderNumber":false,"selectedPrefixes":["PP"],"prefixes":["PP1","PP2","PP3","PP"],"selectedSuffixes":["SS"],"suffixes":["SS1","SS2","SS"]}',
        }],
      };
    }

    if (queryParams && queryParams.query === '(module=ORDERS and configName=closing-reasons)') {
      return {
        configs: [{
          id: '7c7c5a09-d465-4642-889a-8a0b351d7b15',
          module: 'ORDERS',
          configName: 'order.closing-reasons',
          enabled: true,
          value: 'test reason',
          code: 'CLOSING_REASON_1',
        }],
      };
    }

    return { configs: [] };
  });

  this.post('/configurations/entries', (schema, request) => {
    const body = JSON.stringify(request.requestBody);

    if (body.configName === 'order.closing-reasons') {
      return {
        id: '042faa36-23a3-4f62-a52c-e869edb69de1',
        module: 'ORDERS',
        configName: 'order.closing-reasons',
        code: body.code,
        enabled: true,
        value: body.value,
        metadata: {
          createdDate: '2019-04-03T10:58:40.990+0000',
          createdByUserId: '641b9c1e-7cf8-5473-bb16-7a8f13095520',
          updatedDate: '2019-04-03T10:58:40.990+0000',
          updatedByUserId: '641b9c1e-7cf8-5473-bb16-7a8f13095520',
        },
      };
    }

    return {};
  });
  this.put('/configurations/entries/:id', noop);
  this.delete('/configurations/entries/:id', noop);

  this.get(RECEIVING_API, (schema) => {
    return schema.pieces.all();
  });

  this.get(ITEMS_API, ({ items }) => items.all());
}
