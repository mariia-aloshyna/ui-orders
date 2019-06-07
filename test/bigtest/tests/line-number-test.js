import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import LineEditPage from '../interactors/line-edit-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { ORDERS_API } from '../../../src/components/Utils/api';
import { PHYSICAL } from '../../../src/components/POLine/const';

const ORDER_NUMBER = '10001';
const LINE_NUMBER = `${ORDER_NUMBER}-1`;

describe('Line number generation', function () {
  setupApplication();

  const lineEditPage = new LineEditPage();
  let order = null;
  let line = null;
  let vendor = null;

  beforeEach(async function () {
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      poNumber: ORDER_NUMBER,
      workflowStatus: WORKFLOW_STATUS.pending,
      vendor: vendor.id,
    });

    line = this.server.create('line', {
      purchaseOrderId: order.id,
      order,
      poLineNumber: LINE_NUMBER,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
    });

    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}?layer=edit-po-line`);
    await lineEditPage.whenLoaded();
  });

  it('Line number is filled', () => {
    expect(lineEditPage.$root).to.exist;
    expect(lineEditPage.lineNumberInputValue).to.equal(LINE_NUMBER);
  });
});
