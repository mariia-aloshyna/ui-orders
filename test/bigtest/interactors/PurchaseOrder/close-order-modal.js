import {
  interactor,
  is,
} from '@bigtest/interactor';

import Button from '../button';

@interactor class ReasonSelect {
  static defaultScope = '[data-test-closing-reasons]';
  isSelect = is('select');
}

export default interactor(class CloseOrderModal {
  static defaultScope = '[data-test-close-order-modal]';
  submitButton = new Button('[data-test-close-order-modal-submit]');
  cancelButton = new Button('[data-test-close-order-modal-cancel]');
  reasonSelect = new ReasonSelect();
});
