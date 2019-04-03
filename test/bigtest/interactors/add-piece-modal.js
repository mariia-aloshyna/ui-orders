import {
  interactor,
  is,
  property,
  value,
} from '@bigtest/interactor';

@interactor class SupplementInput {
  static defaultScope = '[name="supplement"]';
  isInput = is('input');
  value = value();
}

@interactor class CaptionInput {
  static defaultScope = '[name="caption"]';
  isInput = is('input');
  value = value();
}

@interactor class Button {
  isButton = is('button');
  isDisabled = property('disabled');
}

export default interactor(class AddPieceModal {
  static defaultScope = '#add-piece-modal';

  supplement = new SupplementInput();
  caption = new CaptionInput();
  cancelButton = new Button('[data-test-add-piece-cancel]');
  saveButton = new Button('[data-test-add-piece-save]');
});
