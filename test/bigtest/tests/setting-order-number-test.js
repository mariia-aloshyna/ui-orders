import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SettingOrderNumberInteractor from '../interactors/setting-order-number';

describe('Setting of Order Number', () => {
  const setting = new SettingOrderNumberInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/orders/po-number');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
    expect(setting.suffixSelect.controlPresent).to.be.true;
    expect(setting.suffixSelect.valueCount).to.equal(0);
    expect(setting.suffixSelect.optionCount).to.equal(0);
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
