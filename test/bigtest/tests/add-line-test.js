import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { ORDER_TYPE } from '../../../src/components/PurchaseOrder/PODetails/FieldOrderType';
import { PHYSICAL } from '../../../src/components/POLine/const';
import { ORDERS_API } from '../../../src/components/Utils/api';
import LinesLimitModal from '../interactors/lines-limit-modal';
import OrderDetailsPage from '../interactors/order-details-page';
import setupApplication from '../helpers/setup-application';
import {
  CONFIG_LINES_LIMIT,
  LINES_LIMIT_DEFAULT,
  MODULE_ORDERS,
} from '../../../src/components/Utils/const';

describe('clicking on add Line to open LinesLimit Modal', function () {
  setupApplication();

  const linesLimitModal = new LinesLimitModal();
  const orderDetailsPage = new OrderDetailsPage();
  let line = null;
  let order = null;
  let vendor = null;

  beforeEach(function () {
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.pending,
      orderType: ORDER_TYPE.ongoing,
      vendor: vendor.id,
    });

    line = this.server.create('line', {
      purchaseOrderId: order.id,
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

    this.server.create('configs', {
      module: MODULE_ORDERS,
      configName: CONFIG_LINES_LIMIT,
      enabled: true,
      value: LINES_LIMIT_DEFAULT,
    });

    this.visit(`/orders/view/${order.id}`);
  });

  describe('Click Add Line Button', () => {
    beforeEach(async function () {
      await orderDetailsPage.addLineButton.click();
    });

    it('displays LineLimit Modal', () => {
      expect(linesLimitModal.$root).to.exist;
    });
  });

  describe('Click on Create new PO button', () => {
    beforeEach(async function () {
      await orderDetailsPage.addLineButton.click();
      await linesLimitModal.createOrder();
    });

    it('displays PO Line edit page', () => {
      expect(linesLimitModal.isPresent).to.be.false;
    });
  });
});
