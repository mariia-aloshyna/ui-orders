import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import OrderDetailsPage from '../../interactors/order-details-page';

describe('Order is approved', function () {
  setupApplication();

  const orderDetailsPage = new OrderDetailsPage();

  beforeEach(async function () {
    const pendingOrder = this.server.create('order', {
      approved: true,
    });

    this.visit(`/orders/view/${pendingOrder.id}`);
    await orderDetailsPage.whenLoaded();
  });

  it('Approve button should be hidden ', () => {
    expect(orderDetailsPage.approveOrderButton.isPresent).to.be.false;
  });
});
