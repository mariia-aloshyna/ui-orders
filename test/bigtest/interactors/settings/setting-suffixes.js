import {
  interactor,
} from '@bigtest/interactor';
import MultiSelectionInteractor from '@folio/stripes-components/lib/MultiSelection/tests/interactor';

export default interactor(class SettingSuffixesInteractor {
  static defaultScope = '[data-test-order-settings-suffixes]';
  suffixSelect = new MultiSelectionInteractor('[data-test-suffixes-list]');
});
