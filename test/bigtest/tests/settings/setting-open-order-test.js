import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingOpenOrderInteractor from '../../interactors/settings/setting-open-order';

describe('Setting of opening purchese orders', function () {
  setupApplication();
  const setting = new SettingOpenOrderInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/open-order');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
  });
});
