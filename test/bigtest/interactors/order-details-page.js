import {
  interactor,
  clickable,
  text,
  is,
} from '@bigtest/interactor';

@interactor class EditOrderButton {
  static defaultScope = '[data-test-order-edit]';
  click = clickable();
}

@interactor class ReceiveButton {
  static defaultScope = '[data-test-receiving-button]';
  isButton = is('button');
}

export default interactor(class OrderDetailsPage {
  static defaultScope = '[data-test-order-details]';
  title = text('[class*=paneTitleLabel---]');
  editOrderButton = new EditOrderButton();
  addLineButton = clickable('[data-test-add-line-button]');
  receivingButton = new ReceiveButton();
});
