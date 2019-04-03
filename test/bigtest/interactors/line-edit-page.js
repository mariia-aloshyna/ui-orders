import {
  clickable,
  collection,
  interactor,
  is,
  property,
  text,
  value,
} from '@bigtest/interactor';

import { ACCORDION_ID } from '../../../src/components/POLine/const';

@interactor class UpdateLineButton {
  static defaultScope = '#clickable-updatePoLine';
  isButton = is('button');
  isDisabled = property('disabled');
}

@interactor class QuantityLocationElectronic {
  static defaultScope = '[name$="].quantityElectronic"]';
}

@interactor class QuantityLocationPhysical {
  static defaultScope = '[name$="].quantityPhysical"]';
}

@interactor class LocationAccordion {
  static defaultScope = `#${ACCORDION_ID.location}`;
  clickAddLocationButton = clickable('[data-test-repeatable-field-add-item-button]');
  clickHeader = clickable('[class*=defaultCollapseButton---]');
  locations = collection('[data-test-repeatable-field] [class*=repeatableFieldItem---]');
  warningMessage = text('[class*=feedbackError---]');
  electronicQuantity = new QuantityLocationElectronic();
  physicalQuantity = new QuantityLocationPhysical();
}

@interactor class PublicationDateField {
  static defaultScope = '[name="publicationDate"]';
  isInput = is('input');
}

@interactor class ListUnitPrice {
  static defaultScope = '[name="cost.listUnitPrice"]';
  isInput = is('input');
  value = value();
}

@interactor class QuantityPhysical {
  static defaultScope = '[name="cost.quantityPhysical"]';
  isInput = is('input');
  isDisabled = property('disabled');
}

@interactor class AdditionalCost {
  static defaultScope = '[name="cost.additionalCost"]';
  isInput = is('input');
  isDisabled = property('disabled');
}

@interactor class ListUnitPriceElectronic {
  static defaultScope = '[name="cost.listUnitPriceElectronic"]';
  isInput = is('input');
  isDisabled = property('disabled');
}

@interactor class Discount {
  static defaultScope = '[name="cost.discount"]';
  isInput = is('input');
  isDisabled = property('disabled');
  value = value();
}

@interactor class QuantityElectronic {
  static defaultScope = '[name="cost.quantityElectronic"]';
  isInput = is('input');
  isDisabled = property('disabled');
}

@interactor class PoLineEstimatedPrice {
  static defaultScope = '[data-test-poLineEstimatedPrice]';
  value = text('[class*=kvRoot---]');
}

@interactor class FundDistributionAccordion {
  static defaultScope = `#${ACCORDION_ID.fundDistribution}`;
  clickHeader = clickable('[class*=defaultCollapseButton---]');
  clickAddFundButton = clickable('[data-test-repeatable-field-add-item-button]');
  funds = collection('[data-test-repeatable-field] [class*=repeatableFieldItem---]');
}

export default interactor(class LineEditPage {
  static defaultScope = '[data-test-line-edit]';
  locationAccordion = new LocationAccordion();
  updateLineButton = new UpdateLineButton();
  lineNumberInputValue = value('input[name="poLineNumber"]');
  validationMessage = text('[class*=feedbackError---]');
  publicationDateField = new PublicationDateField();
  listUnitPrice = new ListUnitPrice();
  quantityPhysical = new QuantityPhysical();
  additionalCost = new AdditionalCost();
  listUnitPriceElectronic = new ListUnitPriceElectronic();
  discount = new Discount();
  quantityElectronic = new QuantityElectronic();
  poLineEstimatedPrice = new PoLineEstimatedPrice();
  fundDistributionAccordion = new FundDistributionAccordion();
  title = text('[class*=paneTitleLabel---]');
});
