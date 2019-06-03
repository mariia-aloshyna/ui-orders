import {
  collection,
  interactor,
  text,
} from '@bigtest/interactor';

import Button from './button';
import { CheckBox } from './common';

export default interactor(class ReceivingPage {
  static defaultScope = '[data-test-receiving]';
  textOnPage = text('Receivings List');
  receivePiecesButton = new Button('[data-test-receive-pieces-button]');
  closeButton = new Button('[data-test-close-button]');
  receivingList = collection('[class*=mclRow---]');
  checkbox = new CheckBox();
  receivingHistoryButton = new Button('[data-test-receiving-history-button]');
});
