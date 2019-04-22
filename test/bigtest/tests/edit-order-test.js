import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderEditPage from '../interactors/order-edit-page';
import { ORDER_TYPE } from '../../../src/components/PurchaseOrder/PODetails/FieldOrderType';

describe('OrderEditPage', () => {
  setupApplication();
  let order = null;
  const orderEditPage = new OrderEditPage();

  beforeEach(async function () {
    order = await this.server.create('order');

    return this.visit(`/orders/view/${order.id}?layer=edit`);
  });

  it('displays Edit Order form', () => {
    expect(orderEditPage.$root).to.exist;
    expect(orderEditPage.renewalsAccordion).to.be.false;
    expect(orderEditPage.addNoteButton.isButton).to.be.true;
    expect(orderEditPage.notes().length).to.be.equal(1);
  });

  describe('Select order type Ongoing', () => {
    beforeEach(async function () {
      await orderEditPage.orderTypeSelect.select(ORDER_TYPE.ongoing);
    });

    it('displays Renewals Accordion', () => {
      expect(orderEditPage.renewalsAccordion).to.be.true;
    });
  });

  describe('Click on remove note button', () => {
    beforeEach(async function () {
      await orderEditPage.removeNoteButton.click();
    });

    it('remove note', () => {
      expect(orderEditPage.removeNoteButton.isPresent).to.be.false;
    });
  });

  describe('Click on add note button', () => {
    beforeEach(async function () {
      await orderEditPage.addNoteButton.click();
    });

    it('add note textarea', () => {
      expect(orderEditPage.notes().length).to.be.equal(2);
    });
  });
});
