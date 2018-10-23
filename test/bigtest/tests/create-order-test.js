import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrdersInteractor from '../interactors/orders';

describe('Create order', () => {
  setupApplication();

  const orders = new OrdersInteractor();

  beforeEach(function () {
    return this.visit('/orders?layer=create&sort=id', () => {
      expect(orders.$root).to.exist;
    });
  });

  it('has a PO number field', () => {
    expect(orders.hasPONumberField).to.be.true;
  });

  it('has a created on field', () => {
    expect(orders.hasCreatedOnField).to.be.true;
  });

  it('has a created by field', () => {
    expect(orders.hasCreatedByField).to.be.true;
  });
});
