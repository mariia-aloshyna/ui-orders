import {
  collection,
  interactor,
} from '@bigtest/interactor';

@interactor class OrdersNavigation {
  static defaultScope = '[data-test-orders-navigation]';
}

export default interactor(class OrderLinesInteractor {
  static defaultScope = '[data-test-order-line-instances]';

  instances = collection('[role=row] a');

  navigation = new OrdersNavigation();
});
