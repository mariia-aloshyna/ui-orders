import {
  interactor,
  clickable,
  isPresent,
} from '@bigtest/interactor';

import ClosingReasonForm from './ClosingReasonForm';

const ADD_BUTTON_SELECTOR = '[data-test-add-closign-reason-btn]';

export default interactor(class AddClosingReason {
  static defaultScope = '[data-test-add-closign-reason]';

  hasAddButton = isPresent(ADD_BUTTON_SELECTOR);
  addAction = clickable(ADD_BUTTON_SELECTOR);

  closingReasonForm = new ClosingReasonForm();
});
