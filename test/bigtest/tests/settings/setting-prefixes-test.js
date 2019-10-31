import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingPrefixesInteractor from '../../interactors/settings/setting-prefixes';

describe('Setting - Prefixes of Order Number', function () {
  setupApplication();

  const setting = new SettingPrefixesInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/prefixes');
  });

  it('should be rendered', () => {
    expect(setting.isPresent).to.be.true;
    expect(setting.addPrefixBtn.isPresent).to.be.true;
  });
});
