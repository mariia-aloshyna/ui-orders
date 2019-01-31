import { describe, beforeEach, it, afterEach } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import ReceivingPage from '../interactors/receiving-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';

describe('Receiving', () => {
  setupApplication();

  let order = null;

  beforeEach(async function () {
    order = await this.server.create('order', {
      workflow_status: WORKFLOW_STATUS.open,
    });

    return this.visit(`/orders/view/${order.id}`);
  });

  it('go to receiving list', () => {
    expect(OrderDetailsPage.$root).to.exist;
    expect(OrderDetailsPage.receivingButton).to.exist;
    OrderDetailsPage.receivingButton().then(() => expect(ReceivingPage.$root).to.exist);
  });
});
