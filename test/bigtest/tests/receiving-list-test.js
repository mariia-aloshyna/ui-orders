import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import OrderDetailsPage from '../interactors/order-details-page';
import ReceivingPage from '../interactors/receiving-page';
import { WORKFLOW_STATUS } from '../../../src/components/PurchaseOrder/Summary/FieldWorkflowStatus';
import { PHYSICAL } from '../../../src/components/POLine/const';
import {
  ORDERS_API,
} from '../../../src/components/Utils/api';

const RECEIVING_LIST_COUNT = 10;

describe('Receiving', () => {
  setupApplication();

  let order = null;
  let line = null;
  const orderDetailsPage = new OrderDetailsPage();
  const receivingPage = new ReceivingPage();

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
      id: 'e9009acb-5e89-40b7-8b07-6d565f567778',
      poLineNumber: '1000-1',
    });
    this.server.get(`${ORDERS_API}/${order.id}`, {
      ...order.attrs,
      compositePoLines: [line.attrs],
    });

    this.server.createList('piece', RECEIVING_LIST_COUNT);

    await this.visit(`/orders/view/${order.id}`);
  });

  it('displays Order Details pane', () => {
    expect(orderDetailsPage.$root).to.exist;
  });

  it('displays the Receive button', () => {
    expect(orderDetailsPage.receivingButton.isButton).to.be.true;
  });

  describe('go to receiving list', () => {
    beforeEach(async function () {
      await orderDetailsPage.receivingButton.click();
    });

    it('displays Receiving screen', () => {
      expect(receivingPage.$root).to.exist;
    });
  });

  describe('displays Receiving page', () => {
    beforeEach(async function () {
      await this.visit(`/orders/view/${order.id}/receiving`);
    });

    it('displays Receive Pieces button', () => {
      expect(receivingPage.receivePiecesButton.isButton).to.be.true;
      expect(receivingPage.receivePiecesButton.isDisabled).to.be.true;
    });

    it('displays Close button', () => {
      expect(receivingPage.closeButton.isButton).to.be.true;
    });

    it('renders Receiving List', () => {
      expect(receivingPage.receivingList().length).to.be.equal(RECEIVING_LIST_COUNT);
    });

    describe('go back from Receiving page to Order Details pane', () => {
      beforeEach(async function () {
        await receivingPage.closeButton.click();
      });

      it('go to Order Details pane', () => {
        expect(orderDetailsPage.$root).to.exist;
      });
    });

    describe('check one line and enable Receive Pieces button', () => {
      beforeEach(async () => {
        await receivingPage.receivingList(0).click();
      });

      it('Receive pieces button is enabled', () => {
        expect(receivingPage.receivePiecesButton.isDisabled).to.be.false;
      });
    });

    describe('check all lines and enable Receive Pieces button', () => {
      beforeEach(async () => {
        await receivingPage.checkbox.click();
      });

      it('Receive pieces is enabled', () => {
        expect(receivingPage.receivePiecesButton.isDisabled).to.be.false;
      });

      describe('displays Item Details Modal', () => {
        beforeEach(async () => {
          await receivingPage.receivePiecesButton.click();
        });

        it('Item Details Modal is opened', () => {
          expect(receivingPage.itemDetails.$root).to.exist;
        });

        it('displays disabled Next Button', () => {
          expect(receivingPage.nextButton.isButton).to.be.true;
          expect(receivingPage.nextButton.isDisabled).to.be.true;
        });

        it('displays disabled Previous Button', () => {
          expect(receivingPage.previousButton.isButton).to.be.true;
          expect(receivingPage.previousButton.isDisabled).to.be.true;
        });

        it('displays Cancel Button', () => {
          expect(receivingPage.cancelButton.isButton).to.be.true;
        });

        describe('barcode field could be entered', () => {
          beforeEach(async () => {
            await receivingPage.barcodeInput.fill('12345');
          });

          it('barcode is changed to "12345"', () => {
            expect(receivingPage.barcodeInput.value).to.be.equal('12345');
          });
        });

        describe('close Item Details Modal', () => {
          beforeEach(async () => {
            await receivingPage.cancelButton.click();
          });

          it('go back to ReceivingList page', () => {
            expect(receivingPage.$root).to.exist;
          });
        });

        describe('check pieces and receive them', () => {
          beforeEach(async () => {
            await receivingPage.checkbox.click();
          });

          it('displays enabled Next Button', () => {
            expect(receivingPage.nextButton.isButton).to.be.true;
            expect(receivingPage.nextButton.isDisabled).to.be.false;
          });

          it('displays disabled Previous Button', () => {
            expect(receivingPage.previousButton.isButton).to.be.true;
            expect(receivingPage.previousButton.isDisabled).to.be.true;
          });

          describe('Uncheck all pieces', () => {
            beforeEach(async () => {
              await receivingPage.checkbox.click();
            });

            it('displays disabled Next Button', () => {
              expect(receivingPage.nextButton.isDisabled).to.be.true;
            });

            describe('displays Review Details', () => {
              beforeEach(async () => {
                await receivingPage.checkbox.click();
                await receivingPage.nextButton.click();
              });

              it('displays enabled Receive Button', () => {
                expect(receivingPage.receiveButton.isButton).to.be.true;
                expect(receivingPage.receiveButton.isDisabled).to.be.false;
              });

              it('displays enabled Previous Button', () => {
                expect(receivingPage.previousButton.isButton).to.be.true;
                expect(receivingPage.previousButton.isDisabled).to.be.false;
              });

              describe('Uncheck all pieces', () => {
                beforeEach(async () => {
                  await receivingPage.checkbox.click();
                });

                it('displays disabled Receive Button', () => {
                  expect(receivingPage.receiveButton.isDisabled).to.be.true;
                });
              });

              describe('go back to previous Line Details', () => {
                beforeEach(async () => {
                  await receivingPage.previousButton.click();
                });

                it('displays disabled Previous Button', () => {
                  expect(receivingPage.previousButton.isDisabled).to.be.true;
                });
              });
            });
          });
        });
      });
    });
  });
});
