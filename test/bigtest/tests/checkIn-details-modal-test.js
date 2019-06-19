import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CheckInDetailsModal from '../interactors/checkIn-details-modal';
import CheckInItemsPage from '../interactors/check-in-items-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import { PIECE_STATUS_EXPECTED } from '../../../src/components/Receiving/const';

const RECEIVING_LIST_COUNT = 10;
const TEST_BARCODE = 'test_barcode';

describe('CheckIn Details Modal', function () {
  setupApplication();

  let order = null;
  let line = null;
  const modal = new CheckInDetailsModal();
  const page = new CheckInItemsPage();

  beforeEach(async function () {
    line = this.server.create('line', {
      orderFormat: PHYSICAL,
      checkinItems: true,
      cost: {
        quantityPhysical: 2,
      },
    });

    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
      compositePoLines: [line.attrs],
      id: line.attrs.purchaseOrderId,
    });

    this.server.createList('piece', RECEIVING_LIST_COUNT, {
      receivingStatus: PIECE_STATUS_EXPECTED,
      poLineId: line.id,
      pieceFormat: 'physical',
    });

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}/check-in/items`);
    await page.pieces(0).checkPiece.click();
    await page.checkInButton.click();
  });

  it('displays CheckIn Details Modal', () => {
    expect(modal.$root).to.exist;
    expect(modal.checkInButton.isButton).to.be.true;
    expect(modal.cancelButton.isButton).to.be.true;
  });

  describe('barcode could be changed', () => {
    beforeEach(async function () {
      await modal.barcodeInput.fill(TEST_BARCODE);
    });

    it('barcode value is changed to "test"', () => {
      expect(modal.barcodeInput.value).to.be.equal(TEST_BARCODE);
    });
  });

  describe('uncheck all items', () => {
    beforeEach(async function () {
      await modal.checkAll.click();
    });

    it('displays disabled CheckIn Button', () => {
      expect(modal.checkInButton.isDisabled).to.be.true;
    });
  });

  describe('close CheckIn Details Modal', () => {
    beforeEach(async function () {
      await modal.cancelButton.click();
    });

    it('go to CheckIn item page', () => {
      expect(page.$root).to.exist;
    });
  });
});
