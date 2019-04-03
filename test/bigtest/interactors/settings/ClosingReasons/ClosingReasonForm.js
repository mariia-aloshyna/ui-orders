import {
  interactor,
  clickable,
  fillable,
} from '@bigtest/interactor';

export default interactor(class ClosingReasonForm {
  static defaultScope = '[data-test-closign-reason-form]';

  fillValue = fillable('input[name="value"]');
  cancelAction = clickable('[data-test-closing-reason-form-cancel]');
  submitAction = clickable('[data-test-closing-reason-form-submit]');
});
