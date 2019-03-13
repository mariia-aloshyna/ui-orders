import {
  collection,
  interactor,
  isPresent,
  scoped,
} from '@bigtest/interactor';

export default interactor(class OrdersInteractor {
  static defaultScope = '[data-test-order-instances]';

  hasCreateOrderButton = isPresent('#clickable-neworder');
  hasPONumberField = isPresent('[name="poNumber"]');
  hasVendorNameField = isPresent('[name="vendorName"]');
  hasCreatedByField = isPresent('[name="createdByName"]');
  orders = collection('[role=row] a');
  order = scoped('[data-test-order-details]');
});
