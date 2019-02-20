import {
  interactor,
  text,
  isPresent,
  value,
} from '@bigtest/interactor';

@interactor class SuffixSelect {
  static defaultScope = 'select[name="numberSuffix"]';
  value = value();
}

export default interactor(class OrderEditPage {
  static defaultScope = '[data-test-form-page]';
  isLoaded = isPresent('[class*=paneTitleLabel---]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  title = text('[class*=paneTitleLabel---]');
  suffixSelect = new SuffixSelect();
});
