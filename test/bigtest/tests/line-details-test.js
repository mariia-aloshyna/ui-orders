import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';
import setupApplication from '../helpers/setup-application';
import LineDetailsPage from '../interactors/line-details-page';
import ReceivingPage from '../interactors/receiving-page';

describe('Line details test', function () {
  setupApplication();

  let order = null;
  let line = null;
  let fund = null;
  let vendor = null;
  const page = new LineDetailsPage();
  const receivingPage = new ReceivingPage();

  beforeEach(function () {
    fund = this.server.create('fund');
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
      vendor: vendor.id,
    });
    line = this.server.create('line', {
      purchaseOrderId: order.id,
      order,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
      fundDistribution: [
        {
          fundId: fund.id,
          percentage: 100,
        },
      ],
    });

    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}`);
  });

  it('displays Line details pane', function () {
    expect(page.$root).to.exist;
    expect(page.receiveButton.isPresent).to.be.true;
  });

  it('does not display actions', function () {
    expect(page.actions.isPresent).to.be.false;
  });

  describe('Receive button can be clicked on PO Line level', function () {
    beforeEach(async function () {
      await page.receiveButton.click();
    });

    it('transition to Receiving screen', function () {
      expect(receivingPage.$root).to.exist;
    });
  });

  describe('go back to Order Details', function () {
    beforeEach(async function () {
      await page.goBackToOrderButton.click();
    });

    it('Line Details is closed', function () {
      expect(page.isPresent).to.be.false;
    });
  });
});
