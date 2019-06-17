import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingSuffixesInteractor from '../../interactors/settings/setting-suffixes';

describe('Setting of Order Number', function () {
  setupApplication();

  const setting = new SettingSuffixesInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/suffixes');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
    expect(setting.suffixSelect.controlPresent).to.be.true;
    expect(setting.suffixSelect.valueCount).to.equal(0);
    expect(setting.suffixSelect.optionCount).to.equal(0);
  });

  describe('add and select a suffix', () => {
    beforeEach(async () => {
      await setting.suffixSelect.clickControl();
      await setting.suffixSelect.fillFilter('SS');
      await setting.suffixSelect.options(0).clickOption();
    });

    it('has suffix option added', () => {
      expect(setting.suffixSelect.optionCount).to.equal(1);
      expect(setting.suffixSelect.valueCount).to.equal(1);
    });
  });
});
