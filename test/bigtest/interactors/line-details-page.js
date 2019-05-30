import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

import Button from './button';

@interactor class LineDetailsPageActions {
  static defaultScope = '[data-test-line-details-actions]';

  toggle = new Button('[class*=paneHeaderCenterButton---]');
  viewPOButton = new Button('[data-test-line-details-actions-view-po]');
}

export default interactor(class LineDetailsPage {
  static defaultScope = '#pane-poLineDetails';
  receiveButton = new Button('[data-test-line-receive-button]');
  checkInButton = new Button('[data-test-line-check-in-button]');
  otherDetailsAccordion = isPresent('#other');

  actions = new LineDetailsPageActions();
});
