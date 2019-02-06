import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import LineEditPage from '../interactors/line-edit-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { ORDERS_API } from '../../../src/components/Utils/api';
import { PHYSICAL } from '../../../src/components/POLine/const';

const ORDER_NUMBER = '10001';
const LINE_NUMBER = `${ORDER_NUMBER}-1`;

describe('Line number generation', () => {
  setupApplication();

  const lineEditPage = new LineEditPage();
  let order = null;
  let line = null;

  beforeEach(async function () {
    order = await this.server.create('order', {
      po_number: ORDER_NUMBER,
      workflow_status: WORKFLOW_STATUS.pending,
    });

    line = await this.server.create('line', {
      order,
      po_line_number: LINE_NUMBER,
      order_format: PHYSICAL,
      cost: {
        quantity_physical: 2,
      },
    });

    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}?layer=edit-po-line`);
  });

  it('Line number is filled', () => {
    expect(lineEditPage.$root).to.exist;
    expect(lineEditPage.lineNumberInputValue).to.equal(LINE_NUMBER);
  });
});
