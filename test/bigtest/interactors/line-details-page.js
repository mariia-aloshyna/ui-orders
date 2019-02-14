import {
  interactor,
  is,
} from '@bigtest/interactor';

@interactor class ReceiveButton {
  static defaultScope = '[data-test-line-receive-button]';
  isButton = is('button');
}

export default interactor(class LineDetailsPage {
  static defaultScope = '#pane-poLineDetails';
  receiveButton = new ReceiveButton();
});
