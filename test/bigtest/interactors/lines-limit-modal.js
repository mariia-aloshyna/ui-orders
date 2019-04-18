import {
  clickable,
  interactor,
} from '@bigtest/interactor';

export default interactor(class LinesLimitModal {
  static defaultScope = '[data-test-lines-limit-modal]';
  createOrder = clickable('[data-test-clone-order-and-create-line]');
  okButton = clickable('[data-test-ok-button]')
});
