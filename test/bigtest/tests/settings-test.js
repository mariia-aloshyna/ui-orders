import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SettingsInteractor from '../interactors/settings';

const SETTINGS_COUNT = 2;

describe('Settings', () => {
  const settings = new SettingsInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/orders');
  });

  it('renders', () => {
    expect(settings.isPresent).to.be.true;
  });

  it('renders each setting', () => {
    expect(settings.orderSettings().length).to.be.equal(SETTINGS_COUNT);
  });

  it('clicks each setting', () => {
    settings.orderSettings().map((setting, i) => setting.click());
  });
});
