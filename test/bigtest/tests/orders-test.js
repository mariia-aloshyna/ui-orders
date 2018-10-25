import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrdersInteractor from '../interactors/orders';

describe('Orders', () => {
  setupApplication();

  const orders = new OrdersInteractor();

  beforeEach(function () {
    return this.visit('/orders', () => {
      expect(orders.$root).to.exist;
    });
  });

  it('create new order button', () => {
    expect(orders.hasCreateOrderButton).to.be.true;
  });
});
