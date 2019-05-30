import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import OrderLinesInteractor from '../../interactors/order-lines';

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

  describe('renders search button', () => {
    it('search button is disabled', () => {
      expect(orderLines.filter.searchButton.isDisabled).to.be.true;
    });
  });

  describe('filter by metadata.createdDate', function () {
    beforeEach(async function () {
      await orderLines.filter.fillCreatedDateStart('2019-01-01');
      await orderLines.filter.fillCreatedDateEnd('2019-08-01');
      await orderLines.filter.applyCreatedDate.click();
    });

    it('should load list without errors', () => {
      expect(orderLines.instances().length).to.be.equal(ORDER_LINES_COUNT);
    });
  });

  it('renders expanded payment status filter', () => {
    expect(orderLines.filter.accordionPaymentStatus.isExpanded).to.be.true;
  });

  it('renders expanded receipt status filter', () => {
    expect(orderLines.filter.accordionReceiptStatus.isExpanded).to.be.true;
  });

  it('renders collapsed created date filter', () => {
    expect(orderLines.filter.accordionCreatedDate.isExpanded).to.be.false;
  });

  describe('search by title', function () {
    beforeEach(async function () {
      await orderLines.filter.selectSearchOption('Title');
      await orderLines.filter.searchInput('TEST');
      await orderLines.filter.searchButton.click();
    });

    it('no lines found', () => {
      expect(orderLines.instances().length).to.be.equal(0);
    });
  });
});
