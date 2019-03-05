import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import ReceivingHistoryPage from '../interactors/receiving-history-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PIECE_STATUS_RECEIVED } from '../../../src/components/Receiving/const';

const RECEIVING_LIST_COUNT = 10;

describe('Receiving', () => {
  setupApplication();

  let order = null;
  const orderDetailsPage = new OrderDetailsPage();
  const page = new ReceivingHistoryPage();

  beforeEach(async function () {
    order = await this.server.create('order', {
      workflow_status: WORKFLOW_STATUS.open,
    });

    this.server.createList('piece', RECEIVING_LIST_COUNT, { receivingStatus: PIECE_STATUS_RECEIVED });

    await this.visit(`/orders/view/${order.id}/receiving-history`);
  });

  it('displays Receiving History screen', () => {
    expect(page.$root).to.exist;
  });

  it('displays pieces', () => {
    expect(page.pieces().length).to.be.equal(RECEIVING_LIST_COUNT);
  });

  it('displays Close button', () => {
    expect(page.closeButton.isButton).to.be.true;
  });

  it('displays Remove button disabled', () => {
    expect(page.removeButton.isButton).to.be.true;
    expect(page.removeButton.isDisabled).to.be.true;
  });

  describe('search text could be entered', () => {
    beforeEach(async () => {
      await page.searchInput.fill('test');
    });

    it('search text is changed to "test"', () => {
      expect(page.searchInput.value).to.be.equal('test');
    });
  });

  describe('Check Item and Enable Remove button', () => {
    beforeEach(async () => {
      await page.pieces(0).click();
    });

    it('Remove button is enabled', () => {
      expect(page.removeButton.isDisabled).to.be.false;
    });
  });

  describe('go back from Receiving History page to Order Details pane', () => {
    beforeEach(async function () {
      await page.closeButton.click();
    });

    it('go to Order Details pane', () => {
      expect(orderDetailsPage.$root).to.exist;
    });
  });
});
