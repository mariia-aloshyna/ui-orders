import {
  clickable,
  collection,
  interactor,
  is,
  property,
  value,
} from '@bigtest/interactor';

@interactor class SearchInput {
  static defaultScope = '[data-test-check-in-history-search] input[type="search"]';
  isInput = is('input');
  value = value();
}

@interactor class RemoveButton {
  static defaultScope = '[data-test-check-in-remove]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class ConfirmationModal {
  static defaultScope = '[class*=modal---]';
  confirmButton = clickable('[data-test-confirmation-modal-confirm-button]');
  cancelButton = clickable('[data-test-confirmation-modal-cancel-button]');
}

@interactor class CloseButton {
  static defaultScope = '[data-test-close-button]';
  isButton = is('button');
}

@interactor class CheckAllCheckbox {
  static defaultScope = 'input[name="isAllChecked"]';
}

export default interactor(class CheckInHistoryPage {
  static defaultScope = '[data-test-check-in-history]';
  closeButton = new CloseButton();
  searchInput = new SearchInput();
  removeButton = new RemoveButton();
  pieces = collection('[class*=mclRow---]');
  confirmationModal = new ConfirmationModal();
  checkAllCheckbox = new CheckAllCheckbox();
});
