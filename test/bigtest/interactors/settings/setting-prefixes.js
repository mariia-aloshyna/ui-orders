import {
  interactor,
} from '@bigtest/interactor';
import MultiSelectionInteractor from '@folio/stripes-components/lib/MultiSelection/tests/interactor';

export default interactor(class SettingPrefixesInteractor {
  static defaultScope = '[data-test-order-settings-prefixes]';
  prefixSelect = new MultiSelectionInteractor('[data-test-prefixes-list]');
});
