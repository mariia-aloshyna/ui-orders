import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import ReceivingHistoryPage from '../interactors/receiving-history-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PIECE_STATUS_RECEIVED } from '../../../src/components/Receiving/const';

const RECEIVING_LIST_COUNT = 10;
const BARCODE = '111';

describe('Receiving history', function () {
  setupApplication();

  let order = null;
  let item = null;
  const orderDetailsPage = new OrderDetailsPage();
  const page = new ReceivingHistoryPage();

  beforeEach(async function () {
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
    });
    item = this.server.create('item', { barcode: BARCODE });
    this.server.createList('piece', RECEIVING_LIST_COUNT, {
      itemId: item.id,
      receivingStatus: PIECE_STATUS_RECEIVED,
    });
    this.visit(`/orders/view/${order.id}/receiving-history`);
    await page.whenLoaded();
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

  it('displays barcode', () => {
    expect(page.barcodes(0).barcode).to.equal(BARCODE);
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
      await page.pieces(0).checkPiece.click();
    });

    it('Remove button is enabled', () => {
      expect(page.removeButton.isDisabled).to.be.false;
    });
  });

  describe('Click Remove button', () => {
    beforeEach(async () => {
      await page.pieces(0).checkPiece.click();
      await page.removeButton.click();
    });

    it('Confirmation is displayed', () => {
      expect(page.confirmationModal.$root).to.exist;
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
