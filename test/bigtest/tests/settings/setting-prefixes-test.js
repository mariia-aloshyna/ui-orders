import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingPrefixesInteractor from '../../interactors/settings/setting-prefixes';

describe('Setting of Order Number', function () {
  setupApplication();

  const setting = new SettingPrefixesInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/prefixes');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
    expect(setting.prefixSelect.controlPresent).to.be.true;
    expect(setting.prefixSelect.valueCount).to.equal(0);
    expect(setting.prefixSelect.optionCount).to.equal(0);
  });

  describe('add and select a prefix', () => {
    beforeEach(async () => {
      await setting.prefixSelect.clickControl();
      await setting.prefixSelect.fillFilter('PP');
      await setting.prefixSelect.options(0).clickOption();
    });

    it('has prefix option added', () => {
      expect(setting.prefixSelect.optionCount).to.equal(1);
      expect(setting.prefixSelect.valueCount).to.equal(1);
    });
  });
});
