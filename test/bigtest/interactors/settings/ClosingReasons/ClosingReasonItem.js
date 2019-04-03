import {
  interactor,
  collection,
} from '@bigtest/interactor';

import ClosingReasonForm from './ClosingReasonForm';

export default interactor(class ClosingReasonItem {
  static defaultScope = '[data-test-closing-reason-item]';

  editAction = collection('[data-test-closing-reason-item-edit]');
  removeAction = collection('[data-test-closing-reason-item-remove]');

  closingReasonForm = new ClosingReasonForm();
});
