import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import {
  ORDERS_API,
} from '../../../../src/components/Utils/api';
import setupApplication from '../../helpers/setup-application';
import LineEditPage from '../../interactors/line-edit-page';

const TITLE = 'TEST_VALUE';
const QUANTITY_PHYSICAL = 2;
const INSTANCE_ID = '12345';
const CONTRIBUTOR = 'Test Contributor';
const EDITION = 'Test Edition';
const PUBLISHER = 'Test Publisher';
const PRODUCT_ID = '123456789';

describe('Line edit test - Capture UUID from inventory', function () {
  setupApplication();

  let order = null;
  let line = null;
  let location = null;
  let locations = null;
  let vendor = null;
  const lineEditPage = new LineEditPage();

  beforeEach(async function () {
    vendor = this.server.create('vendor');
    order = this.server.create('order', {
      vendor: vendor.id,
    });
    location = this.server.create('location');

    locations = [
      {
        locationId: location.id,
        quantityPhysical: QUANTITY_PHYSICAL,
        quantityElectronic: 0,
      },
    ];

    line = this.server.create('line', {
      purchaseOrderId: order.id,
      order,
      locations,
      title: TITLE,
      instanceId: INSTANCE_ID,
      contributors: [{ contributor: CONTRIBUTOR }],
      edition: EDITION,
      publisher: PUBLISHER,
      details: {
        productIds: [{ productId: PRODUCT_ID }],
      },
    });

    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [
        {
          ...line.attrs,
          locations,
        },
      ],
    });

    this.visit(`/orders/view/${order.id}/po-line/view/${line.id}?layer=edit-po-line`);
    await lineEditPage.whenLoaded();
  });

  it('Item details fields are shown', () => {
    expect(lineEditPage.instanceId).to.be.equal(INSTANCE_ID);
  });

  describe('Remove instance ID from form', () => {
    beforeEach(async function () {
      await lineEditPage.itemDetailsAccordion.inputTitle('');
      await lineEditPage.itemDetailsAccordion.edition('');
      await lineEditPage.itemDetailsAccordion.publisher('');
    });

    it('instance id is not shown', () => {
      expect(lineEditPage.instanceId).to.be.equal('');
    });
  });

  describe('Instance Id is shown', () => {
    beforeEach(async function () {
      await lineEditPage.addContributorButton.click();
    });

    it('instance id is shown', () => {
      expect(lineEditPage.instanceId).to.be.equal(INSTANCE_ID);
    });
  });

  describe('Instance Id is not shown', () => {
    beforeEach(async function () {
      await lineEditPage.removeContributorButton.click();
      await lineEditPage.removeProductIdsButton.click();
    });

    it('instance id is not shown', () => {
      expect(lineEditPage.instanceId).to.be.equal('');
    });
  });
});
