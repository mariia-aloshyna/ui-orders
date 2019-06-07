import {
  collection,
  interactor,
  isPresent,
  text,
  value,
} from '@bigtest/interactor';

import Button from './button';

@interactor class SuffixSelect {
  static defaultScope = 'select[name="numberSuffix"]';
  value = value();
}

@interactor class OrderTypeSelect {
  static defaultScope = 'select[name="orderType"]';
  value = value();
}

@interactor class VendorInput {
  static defaultScope = 'input[name="vendorName"]';
  value = value();
}

@interactor class OwnerButton {
  static defaultScope = 'button[name="owner"]';
  value = text('[class*=singleValue---] [class*=optionSegment---]');
}

@interactor class SelectionList {
  static defaultScope = 'ul[role="listbox"]';
}

export default interactor(class OrderEditPage {
  static defaultScope = '#pane-poForm';
  isLoaded = isPresent('[class*=paneTitleLabel---]');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }

  title = text('[class*=paneTitleLabel---]');
  suffixSelect = new SuffixSelect();
  renewalsAccordion = isPresent('#renewals');
  orderTypeSelect = new OrderTypeSelect();
  createOrderButton = new Button('#clickable-create-new-purchase-order');
  vendorInput = new VendorInput();
  addNoteButton = new Button('[data-test-add-note-button]');
  removeNoteButton = new Button('[data-test-remove-note-button]');
  notes = collection('[name*=notes]');
  owner = new OwnerButton();
  ownerOptions = new SelectionList();
});
