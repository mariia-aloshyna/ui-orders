import {
  interactor,
  clickable,
  text,
  is,
} from '@bigtest/interactor';

@interactor class HeaderDropdown {
  click = clickable('a');
}

@interactor class ReceiveButton {
  static defaultScope = '[data-test-receiving-button]';
  isButton = is('button');
}

export default interactor(class OrderDetailsPage {
  static defaultScope = '[data-test-order-details]';
  title = text('[class*=paneTitleLabel---]');
  headerDropdown = new HeaderDropdown('[class*=paneContentLastArea---]');
  addLineButton = clickable('[data-test-add-line-button]');
  receivingButton = new ReceiveButton();
});
