import {
  interactor,
} from '@bigtest/interactor';
import MultiSelectionInteractor from '@folio/stripes-components/lib/MultiSelection/tests/interactor';

export default interactor(class SettingOrderNumberInteractor {
  static defaultScope = '[data-test-order-settings-order-number]';
  suffixSelect = new MultiSelectionInteractor('[data-test-suffixes-list]');
  prefixSelect = new MultiSelectionInteractor('[data-test-prefixes-list]');
});
