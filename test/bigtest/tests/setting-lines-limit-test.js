import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SettingLineLimitInteractor from '../interactors/setting-line-limit';

describe('Setting of Lines Limit', () => {
  const setting = new SettingLineLimitInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/orders/polines-limit');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
  });
});
