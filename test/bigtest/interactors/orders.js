import {
  collection,
  interactor,
  isPresent,
  scoped,
  fillable,
} from '@bigtest/interactor';

import Button from './button';

@interactor class OrdersFilterInteractor {
  static defaultScope = '#pane-filter';

  fillDateOrderedStart = fillable('input[name="startDate"]');
  fillDateOrderedEnd = fillable('input[name="endDate"]');
  applyDateOrdered = new Button('[data-test-apply-button]');
}

export default interactor(class OrdersInteractor {
  static defaultScope = '[data-test-order-instances]';

  hasCreateOrderButton = isPresent('#clickable-neworder');
  hasPONumberField = isPresent('[name="poNumber"]');
  hasVendorNameField = isPresent('[name="vendorName"]');
  hasCreatedByField = isPresent('[name="createdByName"]');
  orders = collection('[role=row] a');
  order = scoped('[data-test-order-details]');

  filter = new OrdersFilterInteractor();
});
