import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { WORKFLOW_STATUS } from '../../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import {
  OTHER,
  PHYSICAL,
} from '../../../../src/components/POLine/const';
import setupApplication from '../../helpers/setup-application';
import LineDetailsPage from '../../interactors/line-details-page';
import {
  LINES_API,
} from '../../../../src/components/Utils/api';

describe('Order lines list - Line details test', () => {
  setupApplication();
  let order = null;
  let line = null;
  const page = new LineDetailsPage();

  beforeEach(async function () {
    order = await this.server.create('order', {
      workflowStatus: WORKFLOW_STATUS.open,
    });
    line = await this.server.create('line', {
      order,
      orderFormat: PHYSICAL,
      cost: {
        quantityPhysical: 2,
      },
    });

    this.server.get(`${LINES_API}/${line.id}`, {
      ...line.attrs,
    });

    this.visit(`/orders/lines/view/${line.id}/`);
  });

  it('displays Line details pane', () => {
    expect(page.isPresent).to.be.true;
  });

  describe('displays Other resource details', () => {
    beforeEach(async function () {
      line = await this.server.create('line', {
        order,
        orderFormat: OTHER,
        cost: {
          quantityPhysical: 2,
        },
      });

      this.server.get(`${LINES_API}/${line.id}`, {
        ...line.attrs,
      });

      this.visit(`/orders/lines/view/${line.id}/`);
    });

    it('displays Other details accordion', () => {
      expect(page.otherDetailsAccordion).to.be.true;
    });
  });
});
