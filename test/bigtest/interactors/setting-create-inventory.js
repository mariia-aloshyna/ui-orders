import {
  interactor,
  is,
  text,
} from '@bigtest/interactor';

import Button from './button';

@interactor class EresourcesSelect {
  static defaultScope = '[name="eresource"]';
  isSelect = is('select');
}

@interactor class PhysicalSelect {
  static defaultScope = '[name="physical"]';
  isSelect = is('select');
}

@interactor class OtherSelect {
  static defaultScope = '[name="other"]';
  isSelect = is('select');
}

export default interactor(class SettingCreateInventoryInteractor {
  static defaultScope = '[data-test-order-settings-create-inventory]';
  saveButton = new Button('#clickable-save-config');
  eresourcesSelect = new EresourcesSelect();
  physicalSelect = new PhysicalSelect();
  otherSelect = new OtherSelect();
  title = text('[class*=paneTitleLabel---]');
});
