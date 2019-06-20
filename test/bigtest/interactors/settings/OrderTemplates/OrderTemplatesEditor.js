import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

export default interactor(class OrderTemplatesList {
  static defaultScope = '#order-settings-order-templates-editor';

  isLoaded = isPresent('#order-template-form');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
