import {
  interactor,
  text,
} from '@bigtest/interactor';

export default interactor(class ReceivingPage {
  static defaultScope = '[data-test-receiving]';
  textOnPage = text('Receivings List');
});
