import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingLineLimitInteractor from '../../interactors/settings/setting-line-limit';

describe('Setting of Lines Limit', function () {
  setupApplication();
  const setting = new SettingLineLimitInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/polines-limit');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
  });
});
