import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { PHYSICAL, ERESOURCE } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';
import setupApplication from '../helpers/setup-application';
import LineEditPage from '../interactors/line-edit-page';

describe('Create POL', () => {
  setupApplication();
  let vendor = null;
  let order = null;
  const lineEditPage = new LineEditPage();

  beforeEach(async function () {
    vendor = await this.server.create('vendor', {
      discount_percent: 5,
    });
    order = await this.server.create('order', {
      vendor: vendor.id,
    });

    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
    });

    this.visit(`/orders/view/${order.id}?layer=create-po-line&sort=id`);
  });

  describe('Physical Details', () => {
    beforeEach(async () => {
      await lineEditPage.selectOrderFormat(PHYSICAL);
      await lineEditPage.physicalDetailsAccordion.toggle();
    });

    it('should display details accordion', () => {
      expect(lineEditPage.physicalDetailsAccordion.isPresent).to.be.true;
    });

    it('should display Material Supplier field', () => {
      expect(lineEditPage.physicalDetailsAccordion.materialSupplierPresent).to.be.true;
    });
  });

  describe('Electronic Details', () => {
    beforeEach(async () => {
      await lineEditPage.selectOrderFormat(ERESOURCE);
      await lineEditPage.electronicDetailsAccordion.toggle();
    });

    it('should display details accordion', () => {
      expect(lineEditPage.electronicDetailsAccordion.isPresent).to.be.true;
    });

    it('should display Access Provider field', () => {
      expect(lineEditPage.electronicDetailsAccordion.accessProviderPresent).to.be.true;
    });
  });
});
