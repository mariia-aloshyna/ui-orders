import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrdersInteractor from '../interactors/orders';

const ORDERS_COUNT = 15;

describe('Orders', function () {
  setupApplication();

  const orders = new OrdersInteractor();

  beforeEach(function () {
    this.server.createList('order', ORDERS_COUNT);
    this.visit('/orders');
  });

  it('shows the list of order items', () => {
    expect(orders.isVisible).to.equal(true);
  });

  it('renders each order', () => {
    expect(orders.orders().length).to.be.equal(ORDERS_COUNT);
  });

  describe('clicking on the first order item', function () {
    beforeEach(async function () {
      await orders.orders(0).click();
    });

    it('loads the order details', function () {
      expect(orders.order.isVisible).to.equal(true);
    });
  });

  describe('filters', function () {
    describe('by dateOrdered', function () {
      it('should have Open and Pending checked by default', () => {
        expect(orders.filters.statusOpenChecked).to.be.true;
        expect(orders.filters.statusPendingChecked).to.be.true;
        expect(orders.filters.statusClosedChecked).to.be.false;
      });
    });

    describe('by dateOrdered', function () {
      beforeEach(async function () {
        await orders.filters.fillDateOrderedStart('2019-01-01');
        await orders.filters.fillDateOrderedEnd('2019-08-01');
        await orders.filters.applyDateOrdered.click();
      });

      it('should load list without errors', () => {
        expect(orders.orders().length).to.be.equal(ORDERS_COUNT);
      });
    });

    describe('by renewalReviewPeriod', function () {
      beforeEach(async function () {
        await orders.filters.fillRenewalReviewPeriod(15);
      });

      it('should load list without errors', () => {
        expect(orders.orders().length).to.be.equal(ORDERS_COUNT);
      });
    });
  });

  it('create new order button', () => {
    expect(orders.hasCreateOrderButton).to.be.true;
  });
});
