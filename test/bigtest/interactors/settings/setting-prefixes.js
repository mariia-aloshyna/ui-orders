import {
  interactor,
} from '@bigtest/interactor';

import { ButtonInteractor } from '@folio/stripes-acq-components/test/bigtest/interactors';

export default interactor(class SettingPrefixesInteractor {
  static defaultScope = '#prefix';

  addPrefixBtn = new ButtonInteractor('#clickable-add-prefix')
});
