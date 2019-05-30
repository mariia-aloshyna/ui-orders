import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import {
  OTHER,
  PHYSICAL,
} from '../../../../src/components/POLine/const';
import setupApplication from '../../helpers/setup-application';
import LineDetailsPage from '../../interactors/line-details-page';
import OrderDetailsPage from '../../interactors/order-details-page';
import {
  LINES_API,
  ORDER_DETAIL_API,
} from '../../../../src/components/Utils/api';

describe('Order lines list - Line details test', () => {
  setupApplication();
  let order = null;
  let line = null;
  const page = new LineDetailsPage();
  const orderPage = new OrderDetailsPage();

  beforeEach(function () {
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
    });
    line = this.server.create('line', {
      order,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
    });

    this.server.get(`${LINES_API}/${line.id}`, {
      ...line.attrs,
    });

    this.server.get(ORDER_DETAIL_API, {
      ...order.attrs,
    });

    this.visit(`/orders/lines/view/${line.id}/`);
  });

  it('displays Line details pane', () => {
    expect(page.isPresent).to.be.true;
  });

  describe('actions', () => {
    beforeEach(async function () {
      await page.actions.toggle.click();
    });

    it('should be present', () => {
      expect(page.actions.isPresent).to.be.true;
    });

    describe('View PO', () => {
      beforeEach(async function () {
        await page.actions.viewPOButton.click();
      });

      it('should redirect to PO details', () => {
        expect(orderPage.isPresent).to.be.true;
      });
    });
  });

  describe('displays Other resource details', () => {
    beforeEach(function () {
      line = this.server.create('line', {
        order,
        orderFormat: OTHER,
        cost: {
          quantityPhysical: 2,
        },
      });

      this.server.get(`${LINES_API}/${line.id}`, {
        ...line.attrs,
      });

      this.visit(`/orders/lines/view/${line.id}/`);
    });

    it('displays Other details accordion', () => {
      expect(page.otherDetailsAccordion).to.be.true;
    });
  });
});
