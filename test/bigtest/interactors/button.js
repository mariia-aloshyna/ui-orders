import {
  interactor,
  is,
  property,
} from '@bigtest/interactor';

export default interactor(class Button {
  isButton = is('button');
  isDisabled = property('disabled');
});
