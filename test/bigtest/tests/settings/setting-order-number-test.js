import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SettingOrderNumberInteractor from '../../interactors/settings/setting-edit-order-number';

describe('Setting of Order Number', function () {
  setupApplication();

  const setting = new SettingOrderNumberInteractor();

  beforeEach(function () {
    this.visit('/settings/orders/po-number');
  });

  it('renders', () => {
    expect(setting.isPresent).to.be.true;
  });
});
