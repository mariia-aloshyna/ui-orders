import {
  clickable,
  interactor,
} from '@bigtest/interactor';

@interactor class LinesLimitModal {
  createOrder = clickable('[data-test-clone-order-and-create-line]');
}

export default new LinesLimitModal('[data-test-lines-limit-modal]');
