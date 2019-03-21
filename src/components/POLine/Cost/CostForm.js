import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { get } from 'lodash';

import {
  Col,
  InfoPopover,
  KeyValue,
  Row,
  TextField,
} from '@folio/stripes/components';

import parseNumber from '../../Utils/parseNumber';
import FieldCurrency from './FieldCurrency';
import { requiredPositiveNumber } from '../../Utils/Validate';
import {
  DISCOUNT_TYPE,
  ERESOURCES,
  PHRESOURCES,
  OTHER,
} from '../const';
import calculateEstimatedPrice from '../calculateEstimatedPrice';

const disabled = true;

const validateNotNegative = (value) => {
  return !value || value >= 0
    ? undefined
    : <FormattedMessage id="ui-orders.cost.validation.cantBeNegative" />;
};

class CostForm extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
  }

  normalizeDiscount = (value, previousValue, allValues, previousAllValues) => {
    if (!value) {
      return value;
    }

    const previousDiscountType = get(previousAllValues, 'cost.discountType');
    const discountType = value.includes('%')
      ? DISCOUNT_TYPE.percentage
      : DISCOUNT_TYPE.amount;

    if (previousDiscountType !== discountType) {
      const { dispatch, change } = this.props;

      dispatch(change('cost.discountType', discountType));
    }

    return parseInt(value, 10) || undefined;
  };

  render() {
    const formValues = this.props.formValues;
    const orderFormat = formValues.orderFormat;
    const validateEresources = ERESOURCES.includes(orderFormat)
      ? { validate: requiredPositiveNumber }
      : { disabled };
    const validatePhresources = PHRESOURCES.includes(orderFormat) || orderFormat === OTHER
      ? { validate: requiredPositiveNumber }
      : { disabled };

    const discountType = get(formValues, 'cost.discountType', DISCOUNT_TYPE.amount) || DISCOUNT_TYPE.amount;
    const isAmountDiscountType = discountType === DISCOUNT_TYPE.amount;
    const poLineEstimatedPrice = calculateEstimatedPrice(formValues);

    return (
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.cost.listPrice" />}
            name="cost.listUnitPrice"
            parse={parseNumber}
            required
            type="number"
            validate={requiredPositiveNumber}
          />
        </Col>
        <Col xs={6}>
          <FieldCurrency />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.cost.quantityPhysical" />}
            name="cost.quantityPhysical"
            type="number"
            parse={parseNumber}
            {...validatePhresources}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.cost.additionalCost" />}
            name="cost.additionalCost"
            parse={parseNumber}
            type="number"
            validate={validateNotNegative}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.cost.unitPriceOfElectronic" />}
            name="cost.listUnitPriceElectronic"
            parse={parseNumber}
            required
            type="number"
            {...validateEresources}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            format={(value) => {
              return !value || isAmountDiscountType
                ? value
                : `${value}%`;
            }}
            fullWidth
            label={<FormattedMessage id="ui-orders.cost.discount" />}
            name="cost.discount"
            normalize={this.normalizeDiscount}
            validate={validateNotNegative}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.cost.quantityElectronic" />}
            name="cost.quantityElectronic"
            type="number"
            parse={parseNumber}
            {...validateEresources}
          />
        </Col>
        <Col
          data-test-poLineEstimatedPrice
          xs={6}
        >
          <KeyValue
            label={
              <div>
                <span>
                  <FormattedMessage id="ui-orders.cost.estimatedPrice" />
                </span>
                <InfoPopover
                  buttonLabel={<FormattedMessage id="ui-orders.cost.buttonLabel" />}
                  content={<FormattedMessage id="ui-orders.cost.info" />}
                />
              </div>
            }
            value={poLineEstimatedPrice}
          />
        </Col>
      </Row>
    );
  }
}

export default CostForm;
