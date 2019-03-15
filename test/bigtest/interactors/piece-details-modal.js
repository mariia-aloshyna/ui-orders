import {
  collection,
  interactor,
  is,
  property,
  value,
} from '@bigtest/interactor';

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

@interactor class BarcodeInput {
  static defaultScope = '[class*=fieldWrapper] input[type="text"]';
  isInput = is('input');
  value = value();
}
export default interactor(class PieceDetailsModal {
  static defaultScope = '#data-test-piece-details-modal';
  piecesInLine = collection('[class*=mclRow---]', {
    barcode: new BarcodeInput(),
    checkbox: new CheckBox(),
  });

  checkbox = new CheckBox();
  nextButton = new NextButton();
  previousButton = new PreviousButton();
  receiveButton = new ReceiveButton();
  cancelButton = new CancelButton();
  barcodeInput = new BarcodeInput();
});
