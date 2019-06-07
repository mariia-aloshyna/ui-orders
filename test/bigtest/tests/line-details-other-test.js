import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { OTHER } from '../../../src/components/POLine/const';
import setupApplication from '../helpers/setup-application';
import LineDetailsPage from '../interactors/line-details-page';
import { ORDERS_API } from '../../../src/components/Utils/api';

describe('Orders List - Line details with other format test', function () {
  setupApplication();
  let order = null;
  let line = null;
  let vendor = null;
  const page = new LineDetailsPage();

  beforeEach(async function () {
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
      vendor: vendor.id,
    });
    line = this.server.create('line', {
      purchaseOrderId: order.id,
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
    await page.whenLoaded();
  });

  it('displays Other details accordion', function () {
    expect(page.otherDetailsAccordion).to.be.true;
  });
});
