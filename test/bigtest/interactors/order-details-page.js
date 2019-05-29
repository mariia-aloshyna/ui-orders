import {
  interactor,
  isPresent,
  text,
} from '@bigtest/interactor';

import Button from './button';

@interactor class Owner {
  static defaultScope = '[data-test-order-details-owner]';
  value = text('[class*=kvRoot---]');
}

@interactor class BillTo {
  static defaultScope = '[data-test-order-details-bill-to]';
  value = text('[class*=kvRoot---]');
}

@interactor class ShipTo {
  static defaultScope = '[data-test-order-details-ship-to]';
  value = text('[class*=kvRoot---]');
}

export default interactor(class OrderDetailsPage {
  static defaultScope = '[data-test-order-details]';
  title = text('[class*=paneTitleLabel---]');
  closeReasonBlock = isPresent('[data-test-close-reason-block]');
  editOrderButton = new Button('[data-test-order-edit]');
  addLineButton = new Button('[data-test-add-line-button]');
  receivingButton = new Button('[data-test-receiving-button]');
  openOrderButton = new Button('[data-test-open-order-button]');
  closeOrderButton = new Button('[data-test-close-order-button]');
  renewalsAccordion = isPresent('#renewals');
  owner = new Owner();
  billTo = new BillTo();
  shipTo = new ShipTo();
});
