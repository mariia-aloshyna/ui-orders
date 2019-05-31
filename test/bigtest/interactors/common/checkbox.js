import {
  interactor,
} from '@bigtest/interactor';

export default interactor(class CheckBox {
  static defaultScope = 'input[type="checkbox"]';
});
