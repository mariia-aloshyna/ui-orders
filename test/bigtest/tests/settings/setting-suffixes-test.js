import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingSuffixesInteractor from '../../interactors/settings/setting-suffixes';

describe('Setting - Suffixes of Order Number', function () {
  setupApplication();

  const setting = new SettingSuffixesInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/suffixes');
  });

  it('should be rendered', () => {
    expect(setting.isPresent).to.be.true;
    expect(setting.addSuffixBtn.isPresent).to.be.true;
  });
});
