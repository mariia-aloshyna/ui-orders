import {
  interactor,
  text,
  isPresent,
} from '@bigtest/interactor';

export default interactor(class OrderEditPage {
  static defaultScope = '[data-test-form-page]';
  isLoaded = isPresent('[class*=paneTitleLabel---]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  title = text('[class*=paneTitleLabel---]');
});
