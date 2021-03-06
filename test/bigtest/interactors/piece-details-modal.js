import {
  collection,
  interactor,
  is,
  value,
} from '@bigtest/interactor';

import Button from './button';
import { CheckBox } from './common';

@interactor class BarcodeInput {
  static defaultScope = '[data-test-barcode]';
  isInput = is('input');
  value = value();
}

@interactor class CommentInput {
  static defaultScope = '[data-test-comment]';
  isInput = is('input');
  value = value();
}

export default interactor(class PieceDetailsModal {
  static defaultScope = '#data-test-piece-details-modal';
  piecesInLine = collection('[class*=mclRow---]', {
    barcode: new BarcodeInput(),
    checkPiece: new CheckBox(),
    comment: new CommentInput(),
  });

  checkboxAll = new CheckBox();
  nextButton = new Button('[data-test-next-button]');
  previousButton = new Button('[data-test-previous-button]');
  receiveButton = new Button('[data-test-receive-button]');
  cancelButton = new Button('[data-test-cancel-button]');
});
