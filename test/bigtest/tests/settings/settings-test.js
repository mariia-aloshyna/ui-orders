import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingsInteractor from '../../interactors/settings/settings';

describe('Settings', function () {
  setupApplication();

  const settings = new SettingsInteractor();

  beforeEach(function () {
    this.visit('/settings/orders');
  });

  it('renders', function () {
    expect(settings.isPresent).to.be.true;
  });

  it('renders each setting', function () {
    expect(settings.orderSettings().length).to.be.gt(0);
  });

  it('clicks each setting', function () {
    settings.orderSettings().map((setting) => setting.click());
  });
});
