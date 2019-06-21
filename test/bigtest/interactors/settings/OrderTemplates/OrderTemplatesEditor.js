import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

export default interactor(class OrderTemplatesList {
  static defaultScope = '#order-template-form';

  isLoaded = isPresent('#order-settings-order-templates-editor');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
