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
import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import LineDetailsPage from '../interactors/line-details-page';

describe('Order details with Line', () => {
  setupApplication();
  const lineDetailsPage = new LineDetailsPage();
  const orderDetailsPage = new OrderDetailsPage();

  let order = null;
  let vendor = null;
  let line = null;

  beforeEach(function () {
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.pending,
      orderType: ORDER_TYPE.ongoing,
      vendor: vendor.id,
    });
    line = this.server.create('line', {
      order,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
      receiptDate: '1111-11-11',
    });

    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    this.visit(`/orders/view/${order.id}`);
  });

  it('displays the order details pane', () => {
    expect(orderDetailsPage.isPresent).to.be.true;
  });

  it('displays list with lines', () => {
    expect(orderDetailsPage.lines().length).to.be.equal(1);
  });

  describe('clicking on line', () => {
    beforeEach(async () => {
      await orderDetailsPage.lines(0).click();
    });

    it('should redirect to Line Details pane', () => {
      expect(lineDetailsPage.isPresent).to.be.true;
    });

    it('should close Order Details pane', () => {
      expect(orderDetailsPage.isPresent).to.be.false;
    });
  });
});
