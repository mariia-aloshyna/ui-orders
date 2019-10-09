import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import CheckInItemsPage from '../../interactors/check-in-items-page';
import { WORKFLOW_STATUS } from '../../../../src/common/constants';
import {
  PE_MIX,
  INVENTORY_RECORDS_TYPE,
} from '../../../../src/components/POLine/const';
import ConfirmationModal from '../../interactors/confirmation';

const RECEIVING_LIST_COUNT = 10;

describe('Check-in items actions', function () {
  setupApplication();

  let order = null;
  let line = null;
  const page = new CheckInItemsPage();

  beforeEach(async function () {
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

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}/check-in/items`);
    await page.whenLoaded();
  });

  describe('click first piece actions button', function () {
    beforeEach(async function () {
      await page.pieces(0).actions.click();
    });

    it('Delete button is visible', function () {
      expect(page.deletePieceButton.isButton).to.be.true;
    });

    describe('click delete button', function () {
      const deleteConfirmation = new ConfirmationModal('#delete-piece-confirmation');

      beforeEach(async function () {
        await page.deletePieceButton.click();
      });

      it('Delete piece confirmation is visible', function () {
        expect(deleteConfirmation.isPresent).to.be.true;
      });

      describe('click confirm button', function () {
        beforeEach(async function () {
          await deleteConfirmation.confirm();
        });

        it('closes delete line confirmation', function () {
          expect(deleteConfirmation.isPresent).to.be.false;
        });
      });
    });
  });
});
