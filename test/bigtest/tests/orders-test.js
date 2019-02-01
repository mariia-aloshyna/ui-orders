import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrdersInteractor from '../interactors/orders';

const ORDERS_COUNT = 15;

// describe('Orders', () => {
//   setupApplication();

//   const orders = new OrdersInteractor();

//   beforeEach(function () {
//     this.server.createList('order', ORDERS_COUNT);

//     return this.visit('/orders', () => {
//       expect(orders.$root).to.exist;
//     });
//   });

//   it('shows the list of order items', () => {
//     expect(orders.isVisible).to.equal(true);
//   });

//   it('renders each order', () => {
//     expect(orders.orders().length).to.be.equal(ORDERS_COUNT);
//   });

//   describe('clicking on the first order item', function () {
//     beforeEach(async function () {
//       await orders.orders(0).click();
//     });

//     it('loads the order details', function () {
//       expect(orders.order.isVisible).to.equal(true);
//     });
//   });

//   it('create new order button', () => {
//     expect(orders.hasCreateOrderButton).to.be.true;
//   });
// });
