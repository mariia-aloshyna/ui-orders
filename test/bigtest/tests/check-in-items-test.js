import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import LineDetailsPage from '../interactors/line-details-page';
import CheckInItemsPage from '../interactors/check-in-items-page';
import AddPieceModal from '../interactors/add-piece-modal';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';

const RECEIVING_LIST_COUNT = 10;

describe('Check-in items', () => {
  setupApplication();

  let order = null;
  let line = null;
  const lineDetailsPage = new LineDetailsPage();
  const page = new CheckInItemsPage();
  const addPieceModal = new AddPieceModal();

  beforeEach(async function () {
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
    });
    line = this.server.create('line', {
      order,
      orderFormat: PHYSICAL,
      checkinItems: true,
      cost: {
        quantityPhysical: 2,
      },
    });
    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    this.server.createList('piece', RECEIVING_LIST_COUNT, { poLineId: line.id });

    await this.visit(`/orders/view/${order.id}/po-line/view/${line.id}`);
  });

  it('displays Line Details pane', () => {
    expect(lineDetailsPage.$root).to.exist;
  });

  it('displays the Check-in button', () => {
    expect(lineDetailsPage.checkInButton.$root).to.exist;
  });

  describe('go to check-in items page', () => {
    beforeEach(async function () {
      await lineDetailsPage.checkInButton.click();
    });

    it('displays Check in items page', () => {
      expect(page.$root).to.exist;
    });

    it('displays Add Piece button', () => {
      expect(page.addPieceButton.isButton).to.be.true;
    });

    it('displays disabled Check-in button', () => {
      expect(page.checkInButton.isButton).to.be.true;
      expect(page.checkInButton.isDisabled).to.be.true;
    });

    it('renders Pieces List', () => {
      expect(page.pieces().length).to.be.equal(RECEIVING_LIST_COUNT);
    });

    describe('click Add Piece button', () => {
      beforeEach(async function () {
        await page.addPieceButton.click();
      });

      it('Add Piece modal is displayed', () => {
        expect(addPieceModal.$root).to.exist;
      });

      it('Add Piece modal Cancel button is enabled', () => {
        expect(addPieceModal.cancelButton.isDisabled).to.be.false;
      });

      describe('click save button', () => {
        beforeEach(async function () {
          await addPieceModal.saveButton.click();
        });

        it('Add Piece modal is displayed since required fields are empty', () => {
          expect(addPieceModal.$root).to.exist;
        });
      });

      describe('click cancel button', () => {
        beforeEach(async function () {
          await addPieceModal.cancelButton.click();
        });

        it('Add Piece modal is closed', () => {
          expect(addPieceModal.isPresent).to.be.false;
        });
      });

      describe('fill required fields and click save button', () => {
        beforeEach(async function () {
          await addPieceModal.caption.fill('test caption');
          await addPieceModal.saveButton.click();
        });

        it.only('Add Piece modal is closed', () => {
          expect(addPieceModal.isPresent).to.be.false;
        });
      });
    });

    describe('Check Item and Enable Remove button', () => {
      beforeEach(async () => {
        await page.pieces(0).click();
      });

      it('Check-in button is enabled', () => {
        expect(page.checkInButton.isDisabled).to.be.false;
      });
    });

    describe('search text could be entered', () => {
      beforeEach(async () => {
        await page.searchInput.fill('test');
      });

      it('search text is changed to "test"', () => {
        expect(page.searchInput.value).to.be.equal('test');
      });
    });

    describe('go back from Receiving page to Order Details pane', () => {
      beforeEach(async function () {
        await page.closeButton.click();
      });

      it('go to Order Details pane', () => {
        expect(lineDetailsPage.$root).to.exist;
      });
    });
  });
});
