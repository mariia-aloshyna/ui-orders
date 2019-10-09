import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import PieceDetailsModal from '../interactors/piece-details-modal';
import ReceivingPage from '../interactors/receiving-page';
import ReceivingHistoryPage from '../interactors/receiving-history-page';
import { WORKFLOW_STATUS } from '../../../src/common/constants';
import { PHYSICAL } from '../../../src/components/POLine/const';
import { PIECE_STATUS_EXPECTED } from '../../../src/components/Receiving/const';

const RECEIVING_LIST_COUNT = 10;
const TEST_BARCODE = 'test';
const ITEM_BARCODE = '111';
const TEST_COMMENT = 'TEST_COMMENT';

describe('Piece Details Modal', function () {
  setupApplication();

  let order = null;
  let item = null;
  let line = null;
  const modal = new PieceDetailsModal();
  const receivingPage = new ReceivingPage();
  const receivingHistoryPage = new ReceivingHistoryPage();

  beforeEach(async function () {
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
    });

    for (let i = 0; i < 2; i++) {
      line = this.server.create('line', {
        purchaseOrderId: order.id,
        orderFormat: PHYSICAL,
        cost: {
          quantityPhysical: 2,
        },
      });

      item = this.server.create('item', { barcode: ITEM_BARCODE });
      this.server.create('piece', {
        receivingStatus: PIECE_STATUS_EXPECTED,
        poLineId: line.id,
        itemId: item.id,
      });

      this.server.createList('piece', RECEIVING_LIST_COUNT - 1, {
        receivingStatus: PIECE_STATUS_EXPECTED,
        poLineId: line.id,
      });
    }

    this.visit(`/orders/view/${order.id}/receiving`);
    await receivingPage.whenLoaded();
    await receivingPage.receivingList(0).checkLine.click();
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

  it('displays barcode fetched from inventory', () => {
    expect(modal.piecesInLine(0).barcode.value).to.equal(ITEM_BARCODE);
  });

  describe('barcode could be changed', () => {
    beforeEach(async () => {
      await modal.piecesInLine(0).barcode.fill(TEST_BARCODE);
    });

    it('barcode value is changed to "test"', () => {
      expect(modal.piecesInLine(0).barcode.value).to.be.equal(TEST_BARCODE);
    });
  });

  describe('comments field could be changed', () => {
    beforeEach(async () => {
      await modal.piecesInLine(0).comment.fill(TEST_COMMENT);
    });

    it('comments field has expected value', () => {
      expect(modal.piecesInLine(0).comment.value).to.be.equal(TEST_COMMENT);
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

  describe('check one piece and next button is enabled', () => {
    beforeEach(async () => {
      await modal.piecesInLine(0).checkPiece.click();
    });

    it('displays enabled Next Button', () => {
      expect(modal.nextButton.isDisabled).to.be.false;
    });

    describe('Button Receive is enabled and clickable', () => {
      beforeEach(async () => {
        await modal.nextButton.click();
      });

      it('displays enabled Receive Button', () => {
        expect(modal.receiveButton.isDisabled).to.be.false;
      });

      describe('Button Receive is clickable', () => {
        beforeEach(async () => {
          await modal.receiveButton.click();
        });

        it('closes modal', () => {
          expect(receivingPage.$root).to.exist;
        });
      });
    });
  });

  describe('check pieces and receive them', () => {
    beforeEach(async () => {
      await modal.checkboxAll.click();
    });

    it('displays enabled Next Button', () => {
      expect(modal.nextButton.isDisabled).to.be.false;
    });

    it('displays disabled Previous Button', () => {
      expect(modal.previousButton.isDisabled).to.be.true;
    });

    describe('Uncheck all pieces', () => {
      beforeEach(async () => {
        await modal.checkboxAll.click();
      });

      it('displays disabled Next Button', () => {
        expect(modal.nextButton.isDisabled).to.be.true;
      });
    });

    describe('displays Review Details', () => {
      beforeEach(async () => {
        await modal.nextButton.click();
      });

      it('displays enabled Receive Button', () => {
        expect(modal.receiveButton.isButton).to.be.true;
        expect(modal.receiveButton.isDisabled).to.be.false;
      });

      it('displays enabled Previous Button', () => {
        expect(modal.previousButton.isDisabled).to.be.false;
      });

      describe('Click on Receive button', () => {
        beforeEach(async () => {
          await modal.receiveButton.click();
        });

        it('displays Receiving History page', () => {
          expect(receivingHistoryPage.$root).to.exist;
        });
      });

      describe('Uncheck all pieces', () => {
        beforeEach(async () => {
          await modal.checkboxAll.click();
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
