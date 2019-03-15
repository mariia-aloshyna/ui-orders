import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import PieceDetailsModal from '../interactors/piece-details-modal';
import ReceivingPage from '../interactors/receiving-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import { PIECE_STATUS_EXPECTED } from '../../../src/components/Receiving/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';

const RECEIVING_LIST_COUNT = 10;
const TEST_BARCODE = 111;

describe('Piece Details Modal', () => {
  setupApplication();

  let order = null;
  // let items = null;
  let line = null;
  const modal = new PieceDetailsModal();
  const receivingPage = new ReceivingPage();

  beforeEach(async function () {
    order = await this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
    });
    line = await this.server.create('line', {
      order,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
    });
    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    // items = this.server.createList('item', RECEIVING_LIST_COUNT);

    this.server.createList('piece', RECEIVING_LIST_COUNT, {
      receivingStatus: PIECE_STATUS_EXPECTED,
      poLineId: line.id,
      // itemId: items[0].id,
    });

    await this.visit(`/orders/view/${order.id}/receiving`);
    await receivingPage.receivingList(0).click();
    await receivingPage.receivePiecesButton.click();
  });

  it('displays Piece Details modal', () => {
    expect(modal.$root).to.exist;
  });

  it('displays pieces', () => {
    expect(modal.piecesInLine().length).to.be.equal(RECEIVING_LIST_COUNT);
  });

  it('displays disabled Next Button', () => {
    expect(modal.nextButton.isButton).to.be.true;
    expect(modal.nextButton.isDisabled).to.be.true;
  });

  it('displays disabled Previous Button', () => {
    expect(modal.previousButton.isButton).to.be.true;
    expect(modal.previousButton.isDisabled).to.be.true;
  });

  it('displays Cancel Button', () => {
    expect(modal.cancelButton.isButton).to.be.true;
  });

  describe('barcode could be changed', () => {
    beforeEach(async () => {
      await modal.barcodeInput.fill(TEST_BARCODE);
    });

    it('barcode value is changed to "test"', () => {
      expect(modal.barcodeInput.value).to.be.equal(TEST_BARCODE);
    });
  });

  describe('close Piece Details modal', () => {
    beforeEach(async () => {
      await modal.cancelButton.click();
    });

    it('go back to ReceivingList page', () => {
      expect(receivingPage.$root).to.exist;
    });
  });

  describe('check pieces and receive them', () => {
    beforeEach(async () => {
      await modal.checkbox.click();
    });

    it('displays enabled Next Button', () => {
      expect(modal.nextButton.isDisabled).to.be.false;
    });

    it('displays disabled Previous Button', () => {
      expect(modal.previousButton.isDisabled).to.be.true;
    });

    describe('Uncheck all pieces', () => {
      beforeEach(async () => {
        await modal.checkbox.click();
      });

      it('displays disabled Next Button', () => {
        expect(modal.nextButton.isDisabled).to.be.true;
      });
    });

    describe('displays Review Details', () => {
      beforeEach(async () => {
        await modal.checkbox.click();
        await modal.nextButton.click();
      });

      it('displays enabled Receive Button', () => {
        expect(modal.receiveButton.isButton).to.be.true;
        expect(modal.receiveButton.isDisabled).to.be.false;
      });

      it('displays enabled Previous Button', () => {
        expect(modal.previousButton.isDisabled).to.be.false;
      });

      describe('Uncheck all pieces', () => {
        beforeEach(async () => {
          await modal.checkbox.click();
        });

        it('displays disabled Receive Button', () => {
          expect(modal.receiveButton.isDisabled).to.be.true;
        });
      });

      describe('go back to previous Line Details', () => {
        beforeEach(async () => {
          await modal.previousButton.click();
        });

        it('displays disabled Previous Button', () => {
          expect(modal.previousButton.isDisabled).to.be.true;
        });

        it('displays enabled Next Button', () => {
          expect(modal.nextButton.isDisabled).to.be.false;
        });
      });
    });
  });
});
