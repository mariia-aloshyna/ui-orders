import {
  collection,
  interactor,
  isPresent,
  scoped,
} from '@bigtest/interactor';

export default interactor(class OrdersInteractor {
  static defaultScope = '[data-test-order-instances]';

  hasCreateOrderButton = isPresent('#clickable-neworder');
  hasPONumberField = isPresent('[name="po_number"]');
  hasVendorNameField = isPresent('#vendor_name');
  hasCreatedByField = isPresent('#created_by_name');

  orders = collection('[role=listitem] a');
  order = scoped('[data-test-order-details]');
});
