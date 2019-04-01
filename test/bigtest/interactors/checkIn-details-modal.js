import {
  interactor,
  is,
  property,
  value,
} from '@bigtest/interactor';

@interactor class CancelButton {
  static defaultScope = '[data-test-cancel-button]';
  isButton = is('button');
}

@interactor class CheckInButton {
  static defaultScope = '[data-test-check-in-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class CheckBox {
  static defaultScope = '[class*=checkboxInput---]';
}

@interactor class BarcodeInput {
  static defaultScope = '[class*=fieldWrapper] input[type="text"]';
  isInput = is('input');
  value = value();
}

export default interactor(class CheckInDetailsModal {
  static defaultScope = '#data-test-check-in-details-modal';
  checkbox = new CheckBox();
  checkInButton = new CheckInButton();
  cancelButton = new CancelButton();
  barcodeInput = new BarcodeInput();
});
