import {
  collection,
  interactor,
  is,
  property,
  value,
} from '@bigtest/interactor';

@interactor class AddPieceButton {
  static defaultScope = '[data-test-check-in-items-add-piece-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class CheckInButton {
  static defaultScope = '[data-test-check-in-items-check-in-button]';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class CloseButton {
  static defaultScope = '[data-test-close-button]';
}

@interactor class Checkbox {
  static defaultScope = '[class*=checkboxInput---]';
}

@interactor class SearchInput {
  static defaultScope = '[data-test-check-in-items-search] input[type="search"]';
  isInput = is('input');
  value = value();
}

export default interactor(class CheckInItemsPage {
  static defaultScope = '[data-test-check-in-items]';
  addPieceButton = new AddPieceButton();
  checkInButton = new CheckInButton();
  closeButton = new CloseButton();
  pieces = collection('[class*=mclRow---]', {
    checkbox: new Checkbox(),
  });

  searchInput = new SearchInput();
});
