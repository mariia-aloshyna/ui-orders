import {
  interactor,
  clickable,
  text,
  isPresent,
} from '@bigtest/interactor';

@interactor class OrderEditPage {
  isLoaded = isPresent('[class*=paneTitleLabel---]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  title = text('[class*=paneTitleLabel---]');
}

export default new OrderEditPage('[data-test-form-page]');
