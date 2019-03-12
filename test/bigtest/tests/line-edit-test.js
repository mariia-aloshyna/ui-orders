import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { PHYSICAL } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';
import setupApplication from '../helpers/setup-application';
import LineEditPage from '../interactors/line-edit-page';

describe('Line edit test', () => {
  setupApplication();
  let order = null;
  let line = null;
  let location = null;
  let locations = null;
  const lineEditPage = new LineEditPage();

  beforeEach(async function () {
    order = await this.server.create('order');
    location = await this.server.create('location');
    line = await this.server.create('line', {
      order,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
    });

    locations = [
      {
        locationId: location.attrs.id,
        quantityPhysical: 2,
        quantityElectronic: 0,
      },
    ];

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
  });

  it('displays Line Edit form', () => {
    expect(lineEditPage.$root).to.exist;
    expect(lineEditPage.addLocationButton.isButton).to.be.true;
    expect(lineEditPage.locationAccordion.isButton).to.be.true;
    expect(lineEditPage.updateLineButton.isButton).to.be.true;
  });

  describe('Location can be added', () => {
    beforeEach(async function () {
      await lineEditPage.locationAccordion.click();
      await lineEditPage.addLocationButton.click();
    });

    it('Location is added', () => {
      expect(lineEditPage.locationList.locations().length).to.be.equal(locations.length + 1);
    });
  });
});
