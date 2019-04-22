import {
  collection,
  interactor,
  is,
  value,
} from '@bigtest/interactor';

import Button from './button';

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
  nextButton = new Button('[data-test-next-button]');
  previousButton = new Button('[data-test-previous-button]');
  receiveButton = new Button('[data-test-receive-button]');
  cancelButton = new Button('[data-test-cancel-button]');
  barcodeInput = new BarcodeInput();
});
