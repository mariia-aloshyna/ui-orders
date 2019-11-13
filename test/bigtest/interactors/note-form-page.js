import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

import Button from './button';

export default interactor(class NoteFormPage {
  static defaultScope = '[class*=paneset---]';

  closeButton = new Button('[data-test-leave-note-form]');
  saveButton = new Button('[data-test-save-note]');

  isLoaded = isPresent('[class*=paneHeader---]');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
