import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderEditPage from '../interactors/order-edit-page';
import { ORDER_TYPE } from '../../../src/components/PurchaseOrder/PODetails/FieldOrderType';

const OWNER_TEST_VALUE = 'some team';

describe('OrderEditPage', () => {
  setupApplication();
  let order = null;
  const orderEditPage = new OrderEditPage();

  beforeEach(function () {
    order = this.server.create('order', { owner: OWNER_TEST_VALUE });

    this.visit(`/orders/view/${order.id}?layer=edit`);
  });

  it('displays Edit Order form', () => {
    expect(orderEditPage.$root).to.exist;
    expect(orderEditPage.renewalsAccordion).to.be.false;
    expect(orderEditPage.addNoteButton.isButton).to.be.true;
    expect(orderEditPage.notes().length).to.be.equal(1);
  });

  it('displays owner', () => {
    expect(orderEditPage.owner.value).to.equal(OWNER_TEST_VALUE);
  });

  describe('Click on select owner', () => {
    beforeEach(async function () {
      await orderEditPage.owner.click();
    });

    it('displays owner options', () => {
      expect(orderEditPage.ownerOptions.isPresent).to.be.true;
    });
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
