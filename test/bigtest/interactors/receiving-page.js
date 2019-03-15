import {
  collection,
  interactor,
  is,
  property,
  text,
  value,
} from '@bigtest/interactor';

@interactor class ReceivePiecesButton {
  static defaultScope = '[data-test-receive-pieces-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class CloseButton {
  static defaultScope = '[data-test-close-button]';
  isButton = is('button');
}

@interactor class CancelButton {
  static defaultScope = '[data-test-cancel-button]';
  isButton = is('button');
}

@interactor class NextButton {
  static defaultScope = '[data-test-next-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class PreviousButton {
  static defaultScope = '[data-test-previous-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class ReceiveButton {
  static defaultScope = '[data-test-receive-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class CheckBox {
  static defaultScope = '[class*=checkboxInput---]';
}

@interactor class ItemDetails {
  static defaultScope = '[class*=modal---]';
}

@interactor class BarcodeInput {
  static defaultScope = '[class*=fieldWrapper] input[type="number"]';
  isInput = is('input');
  value = value();
}

export default interactor(class ReceivingPage {
  static defaultScope = '[data-test-receiving]';
  textOnPage = text('Receivings List');
  receivePiecesButton = new ReceivePiecesButton();
  closeButton = new CloseButton();
  receivingList = collection('[class*=mclRow---]');
  checkbox = new CheckBox();
  itemDetails = new ItemDetails();
  nextButton = new NextButton();
  previousButton = new PreviousButton();
  receiveButton = new ReceiveButton();
  cancelButton = new CancelButton();
  barcodeInput = new BarcodeInput();
});
