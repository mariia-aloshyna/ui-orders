import {
  interactor,
  text,
} from '@bigtest/interactor';

@interactor class ReceivingPage {
  textOnPage = text('Receivings List');
}

export default new ReceivingPage('[data-test-receiving]');
