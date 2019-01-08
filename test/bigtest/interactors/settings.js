import {
  collection,
  interactor,
} from '@bigtest/interactor';

export default interactor(class SettingsInteractor {
  static defaultScope = '[data-test-nav-list]';

  orderSettings = collection('[class*=NavListItem---]');
});
