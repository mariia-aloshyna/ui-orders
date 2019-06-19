import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import LineDetailsPage from '../interactors/line-details-page';
import CheckInItemsPage from '../interactors/check-in-items-page';
import CheckInHistoryPage from '../interactors/check-in-history-page';
import AddPieceModal from '../interactors/add-piece-modal';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import {
  PE_MIX,
  INVENTORY_RECORDS_TYPE,
} from '../../../src/components/POLine/const';
import { PIECE_FORMAT } from '../../../src/components/CheckIn/FieldPieceFormat';

const RECEIVING_LIST_COUNT = 10;
const TEST_CAPTION = 'test caption';

describe('Check-in items', function () {
  setupApplication();

  let order = null;
  let line = null;
  let location = null;
  const lineDetailsPage = new LineDetailsPage();
  const page = new CheckInItemsPage();
  const addPieceModal = new AddPieceModal();
  const checkInHistoryPage = new CheckInHistoryPage();

  beforeEach(async function () {
    location = this.server.create('location');

    line = this.server.create('line', {
      orderFormat: PE_MIX,
      checkinItems: true,
      cost: {
        quantityPhysical: 2,
      },
      physical: {
        createInventory: INVENTORY_RECORDS_TYPE.all,
      },
      eresource: {
        createInventory: INVENTORY_RECORDS_TYPE.none,
      },
    });

    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
      compositePoLines: [line.attrs],
      id: line.attrs.purchaseOrderId,
    });

    this.server.createList('piece', RECEIVING_LIST_COUNT, { poLineId: line.id });

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}`);
    await lineDetailsPage.whenLoaded();
  });

  it('displays Line Details pane', function () {
    expect(lineDetailsPage.$root).to.exist;
  });

  it('displays the Check-in button', function () {
    expect(lineDetailsPage.checkInButton.$root).to.exist;
  });

  describe('go to check-in items page', function () {
    beforeEach(async function () {
      await lineDetailsPage.checkInButton.click();
    });

    it('displays Check in items page', function () {
      expect(page.$root).to.exist;
    });

    it('displays Add Piece button', function () {
      expect(page.addPieceButton.isButton).to.be.true;
    });

    it('displays disabled Check-in button', function () {
      expect(page.checkInButton.isButton).to.be.true;
      expect(page.checkInButton.isDisabled).to.be.true;
    });

    it('renders Pieces List', function () {
      expect(page.pieces().length).to.be.equal(RECEIVING_LIST_COUNT);
    });

    describe('click Add Piece button', function () {
      beforeEach(async function () {
        await page.addPieceButton.click();
      });

      it('Add Piece modal is displayed', function () {
        expect(addPieceModal.$root).to.exist;
      });

      it('Add Piece modal Cancel button is enabled', function () {
        expect(addPieceModal.cancelButton.isDisabled).to.be.false;
      });

      it('Add Item button is disabled', function () {
        expect(addPieceModal.addItemButton.disabled).to.be.empty;
      });

      describe('click save button', function () {
        beforeEach(async function () {
          await addPieceModal.saveButton.click();
        });

        it('Add Piece modal is displayed since required fields are empty', function () {
          expect(addPieceModal.$root).to.exist;
        });
      });

      describe('Check Physical format, fill caption and click save', function () {
        beforeEach(async function () {
          await addPieceModal.caption.fill(TEST_CAPTION);
          await addPieceModal.format.select(PIECE_FORMAT.physical);
          await addPieceModal.saveButton.click();
        });

        it('Add Item button is disabled', function () {
          expect(addPieceModal.addItemButton.disabled).to.be.empty;
        });

        it('Add Piece modal is displayed since Location is required and empty', function () {
          expect(addPieceModal.$root).to.exist;
        });

        describe('Select location', function () {
          beforeEach(async function () {
            await addPieceModal.location.select(`${location.name} (${location.code})`);
          });

          it('Add Item button is enabled', function () {
            expect(addPieceModal.addItemButton.disabled).to.be.null;
          });
        });
      });

      describe('click cancel button', function () {
        beforeEach(async function () {
          await addPieceModal.cancelButton.click();
        });

        it('Add Piece modal is closed', function () {
          expect(addPieceModal.isPresent).to.be.false;
        });
      });

      describe('fill required fields and click save button', function () {
        beforeEach(async function () {
          await addPieceModal.caption.fill(TEST_CAPTION);
          await addPieceModal.format.select(PIECE_FORMAT.electronic);
          await addPieceModal.saveButton.click();
        });

        it('Add Piece modal is closed', function () {
          expect(addPieceModal.isPresent).to.be.false;
        });
      });

      describe('fill required fields and click checkIn button', function () {
        beforeEach(async function () {
          await addPieceModal.caption.fill(TEST_CAPTION);
          await addPieceModal.checkInButton.click();
        });

        it('Redirect to CheckIn history page', function () {
          expect(checkInHistoryPage.$root).to.exist;
        });
      });
    });

    describe('Check Item and Enable Remove button', function () {
      beforeEach(async function () {
        await page.pieces(0).checkPiece.click();
      });

      it('Check-in button is enabled', function () {
        expect(page.checkInButton.isDisabled).to.be.false;
      });
    });

    describe('search text could be entered', function () {
      beforeEach(async function () {
        await page.searchInput.fill('test');
      });

      it('search text is changed to "test"', function () {
        expect(page.searchInput.value).to.be.equal('test');
      });
    });

    describe('go back from Receiving page to Order Details pane', function () {
      beforeEach(async function () {
        await page.closeButton.click();
      });

      it('go to Order Details pane', function () {
        expect(lineDetailsPage.$root).to.exist;
      });
    });
  });
});
