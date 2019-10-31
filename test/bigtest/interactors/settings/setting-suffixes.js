import {
  interactor,
} from '@bigtest/interactor';

import { ButtonInteractor } from '@folio/stripes-acq-components/test/bigtest/interactors';

export default interactor(class SettingSuffixesInteractor {
  static defaultScope = '#suffix';

  addSuffixBtn = new ButtonInteractor('#clickable-add-suffix')
});
