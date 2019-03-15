import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import OrderEditPage from '../interactors/order-edit-page';
import LineEditPage from '../interactors/line-edit-page';
// import LinesLimitModal from '../interactors/lines-limit-modal';

describe('OrderDetailsPage', () => {
  setupApplication();
  const lineEditPage = new LineEditPage();
  const orderDetailsPage = new OrderDetailsPage();
  const orderEditPage = new OrderEditPage();
  // const linesLimitModal = new LinesLimitModal();
  let order = null;

  beforeEach(function () {
    order = this.server.create('order', { workflowStatus: WORKFLOW_STATUS.pending });

    this.visit(`/orders/view/${order.id}`);
  });

  it('displays the order number in the pane header', () => {
    expect(orderDetailsPage.title).to.include(order.poNumber);
  });

  it('displays the Add Line button enabled', () => {
    expect(orderDetailsPage.addLineButton.isButton).to.equal(true);
    expect(orderDetailsPage.addLineButton.isDisabled).to.equal(false);
  });

  describe('clicking on edit', () => {
    beforeEach(async () => {
      await orderDetailsPage.editOrderButton.click();
    });

    it('should redirect to order edit page', () => {
      expect(orderEditPage.$root).to.exist;
    });
  });

  describe('Add Line button should be disabled for Closed orders', () => {
    let closedOrder = null;

    beforeEach(function () {
      closedOrder = this.server.create('order', { workflowStatus: WORKFLOW_STATUS.closed });

      this.visit(`/orders/view/${closedOrder.id}`);
    });

    it('Add Line button is disabled', () => {
      expect(orderDetailsPage.addLineButton.isDisabled).to.equal(true);
    });
  });

  describe('Add Line button should be disabled for Open orders', () => {
    let openOrder = null;

    beforeEach(function () {
      openOrder = this.server.create('order', { workflowStatus: WORKFLOW_STATUS.open });

      this.visit(`/orders/view/${openOrder.id}`);
    });

    it('Add Line button is disabled', () => {
      expect(orderDetailsPage.addLineButton.isDisabled).to.equal(true);
    });
  });

  describe('clicking on add Line', () => {
    beforeEach(async () => {
      await orderDetailsPage.addLineButton.click();
    });

    it('should redirect to add line page', () => {
      // expect(linesLimitModal.$root).to.exist;
      // linesLimitModal.createOrder();

      // should be fixed with new order creation test (POST)
      expect(lineEditPage.$root).to.exist;
    });
  });
});
