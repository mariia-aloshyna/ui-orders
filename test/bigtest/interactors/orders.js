import {
  interactor,
  isPresent,
} from '@bigtest/interactor';

export default interactor(class OrdersInteractor {
  hasCreateOrderButton = isPresent('#clickable-neworder');
  hasPONumberField = isPresent('#po_number');
  hasVendorNameField = isPresent('#vendor_name');
  hasCreatedByField = isPresent('#created_by_name');
});
