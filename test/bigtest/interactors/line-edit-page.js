import {
  collection,
  interactor,
  is,
  property,
} from '@bigtest/interactor';

import { ACCORDION_ID } from '../../../src/components/POLine/const';

@interactor class AddLocationButton {
  static defaultScope = '[data-test-repeatable-field-add-item-button]';
  isButton = is('button');
}

@interactor class UpdateLineButton {
  static defaultScope = '#clickable-updatePoLine';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class LocationAccordion {
  static defaultScope = `#${ACCORDION_ID.location} [class*=defaultCollapseButton---]`;
  isButton = is('button');
}

@interactor class LocationList {
  static defaultScope = '[data-test-repeatable-field]';
  locations = collection('[class*=repeatableFieldItem---]');
}

export default interactor(class LineEditPage {
  static defaultScope = '[data-test-line-edit]';
  addLocationButton = new AddLocationButton();
  locationList = new LocationList();
  locationAccordion = new LocationAccordion();
  updateLineButton = new UpdateLineButton();
});
