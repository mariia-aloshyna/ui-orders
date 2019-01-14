import {
  interactor,
  clickable,
  text,
} from '@bigtest/interactor';

@interactor class HeaderDropdown {
  click = clickable('a');
}

@interactor class OrderDetailsPage {
  title = text('[class*=paneTitleLabel---]');
  headerDropdown = new HeaderDropdown('[class*=paneContentLastArea---]');
  addLineButton = clickable('[data-test-add-line-button]');
}

export default new OrderDetailsPage('[data-test-order-details]');
