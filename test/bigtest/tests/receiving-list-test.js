import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import ReceivingPage from '../interactors/receiving-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';

describe('Receiving', () => {
  setupApplication();

  let order = null;
  let line = null;
  const orderDetailsPage = new OrderDetailsPage();
  const receivingPage = new ReceivingPage();

  beforeEach(async function () {
    order = await this.server.create('order', {
      workflow_status: WORKFLOW_STATUS.open,
    });
    line = await this.server.create('line', {
      order,
      order_format: PHYSICAL,
      cost: {
        quantity_physical: 2,
      },
    });
    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    await this.visit(`/orders/view/${order.id}`);
  });

  it('displays Order Details pane', () => {
    expect(orderDetailsPage.$root).to.exist;
  });

  it('displays the Receive button', () => {
    expect(orderDetailsPage.receivingButton.isButton).to.be.true;
  });

  describe('go to receiving list', () => {
    beforeEach(async function () {
      await orderDetailsPage.receivingButton.click();
    });

    it('displays Receiving screen', () => {
      expect(receivingPage.$root).to.exist;
    });
  });
});
