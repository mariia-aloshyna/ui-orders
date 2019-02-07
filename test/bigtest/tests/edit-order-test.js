import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderEditPage from '../interactors/order-edit-page';

describe('OrderEditPage', () => {
  setupApplication();
  let order = null;
  const orderEditPage = new OrderEditPage();

  beforeEach(async function () {
    order = await this.server.create('order');

    return this.visit(`/orders/view/${order.id}?layer=edit`);
  });

  it('displays Edit Order form', () => {
    expect(orderEditPage.$root).to.exist;
  });
});
