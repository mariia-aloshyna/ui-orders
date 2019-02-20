import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrdersInteractor from '../interactors/orders';
import OrderEditPage from '../interactors/order-edit-page';

describe('Create order', () => {
  setupApplication();

  const orders = new OrdersInteractor();
  const form = new OrderEditPage();

  beforeEach(function () {
    return this.visit('/orders?layer=create&sort=id', () => {
      expect(orders.$root).to.exist;
    });
  });

  it('has a PO number field', () => {
    expect(orders.hasPONumberField).to.be.true;
  });

  it('has a vendor field', () => {
    expect(orders.hasVendorNameField).to.be.true;
  });

  it('has a created by field', () => {
    expect(orders.hasCreatedByField).to.be.true;
  });

  it('suffix select is available', () => {
    expect(form.suffixSelect.value).to.be.equal('');
  });

  describe('suffix could be selected', () => {
    beforeEach(async () => {
      await form.suffixSelect.select('SS');
    });

    it('suffix is changed to "SS"', () => {
      expect(form.suffixSelect.value).to.be.equal('SS');
    });
  });

  describe('suffix could be changed back to empty value', () => {
    beforeEach(async () => {
      await form.suffixSelect.select('SS');
      await form.suffixSelect.select('');
    });

    it('suffix is changed back to blank', () => {
      expect(form.suffixSelect.value).to.be.equal('');
    });
  });
});
