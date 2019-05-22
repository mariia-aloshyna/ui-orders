import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderLinesInteractor from '../interactors/order-lines';

const ORDER_LINES_COUNT = 15;

describe('Order lines', () => {
  setupApplication();

  const orderLines = new OrderLinesInteractor();

  beforeEach(function () {
    this.server.createList('line', ORDER_LINES_COUNT);

    return this.visit('/orders/lines', () => {
      expect(orderLines.$root).to.exist;
    });
  });

  it('shows the list of order line items', () => {
    expect(orderLines.isVisible).to.equal(true);
  });

  it('renders each order line', () => {
    expect(orderLines.instances().length).to.be.equal(ORDER_LINES_COUNT);
  });

  describe('navigation', () => {
    it('should be present', () => {
      expect(orderLines.navigation.isPresent).to.be.true;
    });
  });
});
