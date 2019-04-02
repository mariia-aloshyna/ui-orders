import {
  clickable,
  interactor,
  is,
  property,
  text,
} from '@bigtest/interactor';

@interactor class EditOrderButton {
  static defaultScope = '[data-test-order-edit]';
  click = clickable();
}

@interactor class ReceiveButton {
  static defaultScope = '[data-test-receiving-button]';
  isButton = is('button');
}

@interactor class OpenOrderButton {
  static defaultScope = '[data-test-open-order-button]';
  click = clickable();
}

@interactor class AddLineButton {
  static defaultScope = '[data-test-add-line-button]';
  isButton = is('button');
  click = clickable();
  isDisabled = property('disabled');
}

export default interactor(class OrderDetailsPage {
  static defaultScope = '[data-test-order-details]';
  title = text('[class*=paneTitleLabel---]');
  editOrderButton = new EditOrderButton();
  addLineButton = new AddLineButton();
  receivingButton = new ReceiveButton();
  openOrderButton = new OpenOrderButton();
});
