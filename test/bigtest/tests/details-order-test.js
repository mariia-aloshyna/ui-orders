import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import OrderEditPage from '../interactors/order-edit-page';
import LineEditPage from '../interactors/line-edit-page';
import LinesLimitModal from '../interactors/lines-limit-modal';

describe('OrderDetailsPage', () => {
  setupApplication();
  let order = null;

  beforeEach(async function () {
    order = await this.server.create('order');

    return this.visit(`/orders/view/${order.id}`);
  });

  it('displays the order number in the pane header', () => {
    expect(OrderDetailsPage.title).to.include(order.po_number);
  });

  describe('clicking on edit', () => {
    beforeEach(async () => {
      await OrderDetailsPage.headerDropdown.click();
    });

    it('should redirect to order edit page', () => {
      expect(OrderEditPage.$root).to.exist;
    });
  });

  describe('clicking on add Line', () => {
    beforeEach(async () => {
      await OrderDetailsPage.addLineButton();
    });

    it('should redirect to add line page', () => {
      // expect(LinesLimitModal.$root).to.exist;
      // LinesLimitModal.createOrder();

      // should be fixed with new order creation test (POST)
      expect(LineEditPage.$root).to.exist;
    });
  });
});
