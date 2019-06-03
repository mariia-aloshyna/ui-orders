import {
  collection,
  interactor,
  is,
  value,
} from '@bigtest/interactor';

import Button from './button';
import { CheckBox } from './common';

@interactor class SearchInput {
  static defaultScope = '[data-test-check-in-items-search] input[type="search"]';
  isInput = is('input');
  value = value();
}

export default interactor(class CheckInItemsPage {
  static defaultScope = '[data-test-check-in-items]';
  addPieceButton = new Button('[data-test-check-in-items-add-piece-button]');
  checkInButton = new Button('[data-test-check-in-items-check-in-button]');
  closeButton = new Button('[data-test-close-button]');
  pieces = collection('[class*=mclRow---]', {
    checkbox: new CheckBox(),
  });

  searchInput = new SearchInput();
});
