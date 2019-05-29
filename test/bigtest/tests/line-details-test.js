import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import {
  OTHER,
  PHYSICAL,
} from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';
import setupApplication from '../helpers/setup-application';
import LineDetailsPage from '../interactors/line-details-page';
import ReceivingPage from '../interactors/receiving-page';

describe('Line details test', () => {
  setupApplication();
  let order = null;
  let line = null;
  const page = new LineDetailsPage();
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

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}`);
  });

  it('displays Line details pane', () => {
    expect(page.$root).to.exist;
    expect(page.receiveButton.isPresent).to.be.true;
  });

  describe('Receive button can be clicked on PO Line level', () => {
    beforeEach(async function () {
      await page.receiveButton.click();
    });

    it('transition to Receiving screen', () => {
      expect(receivingPage.$root).to.exist;
    });
  });

  describe('displays Other resource details', () => {
    beforeEach(async function () {
      line = await this.server.create('line', {
        order,
        orderFormat: OTHER,
        cost: {
          quantityPhysical: 2,
        },
      });

      this.server.get(`${ORDERS_API}/${order.id}`, {
        ...order.attrs,
        compositePoLines: [line.attrs],
      });

      this.visit(`/orders/view/${order.id}/po-line/view/${line.id}`);
    });

    it('displays Other details accordion', () => {
      expect(page.otherDetailsAccordion).to.be.true;
    });
  });
});
