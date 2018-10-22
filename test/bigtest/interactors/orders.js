import {
  interactor,
  isPresent
} from '@bigtest/interactor';

export default interactor(class OrdersInteractor {
  hasCreateOrderButton = isPresent('#clickable-neworders');
  hasPONumberField = isPresent('#po_number');
  hasCreatedOnField = isPresent('#created');
  hasCreatedByField = isPresent('#created_by_name');
});
