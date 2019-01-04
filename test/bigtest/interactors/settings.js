import {
  collection,
  interactor,
} from '@bigtest/interactor';

export default interactor(class SettingsInteractor {
  static defaultScope = '[data-test-order-settings]';

  orderSettings = collection('[class*=NavListItem---]');
});
