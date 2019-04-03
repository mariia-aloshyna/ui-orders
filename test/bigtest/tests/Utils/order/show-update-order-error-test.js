import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import showUpdateOrderError from '../../../../../src/components/Utils/order/showUpdateOrderError';

describe('showUpdateOrderError', () => {
  let fakeCallout;
  let fakeResponse;

  beforeEach(async () => {
    fakeCallout = {
      sendCallout: sinon.spy(),
    };
    fakeResponse = {
      json: () => ({
        errors: [
          {
            code: 'vendorIsInactive',
          },
        ],
      }),
    };

    await showUpdateOrderError(fakeResponse, fakeCallout);
  });

  it('should call callout with right error', () => {
    expect(fakeCallout.sendCallout.firstCall.args[0].message.props.id).to.equal('ui-orders.errors.vendorIsInactive');
  });
});
