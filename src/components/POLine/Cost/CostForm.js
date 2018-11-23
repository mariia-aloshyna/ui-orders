import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Field,
  getFormValues,
} from 'redux-form';
import {
  Col,
  InfoPopover,
  KeyValue,
  Row,
  TextField,
} from '@folio/stripes/components';
import FieldCurrency from './FieldCurrency';
import { requiredPositiveNumber } from '../../Utils/Validate';
import {
  ERESOURCES,
  PHRESOURCES,
} from '../const';

class CostForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.calculateEstimatedPrice = this.calculateEstimatedPrice.bind(this);
  }

  onChangeInput(e, propertyName) {
    const { dispatch, change } = this.props;
    dispatch(change(propertyName, e));
  }

  calculateEstimatedPrice() {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('POLineForm')(store.getState());
    const listPrice = parseFloat(formValues.cost.list_price).toFixed(2);
    const quantityPhysical = parseInt(formValues.cost.quantity_physical, 10);
    const quantityElectronic = parseInt(formValues.cost.quantity_electronic, 10);
    const estimatedPrice = listPrice * (quantityPhysical + quantityElectronic);
    return estimatedPrice || '';
  }

  render() {
    const { initialValues } = this.props;
    const orderFormat = get(initialValues, 'order_format');
    const validateEresources = ERESOURCES.includes(orderFormat);
    const validatePhresources = PHRESOURCES.includes(orderFormat);

    return (
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id="cost.list_price"
            label={<FormattedMessage id="ui-orders.cost.listPrice" />}
            name="cost.list_price"
            onChange={e => this.onChangeInput(e.target.value, 'cost.list_price')}
            type="number"
          />
        </Col>
        <Col xs={6}>
          <FieldCurrency />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id="cost.quantity_physical"
            label={<FormattedMessage id="ui-orders.cost.quantityPhysical" />}
            name="cost.quantity_physical"
            type="number"
            validate={validatePhresources ? [requiredPositiveNumber] : []}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id="cost.quantity_electronic"
            label={<FormattedMessage id="ui-orders.cost.quantityElectronic" />}
            name="cost.quantity_electronic"
            type="number"
            validate={validateEresources ? [requiredPositiveNumber] : []}
          />
        </Col>
        <Col xs={6}>
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
            value={this.calculateEstimatedPrice()}
          />
        </Col>
      </Row>
    );
  }
}

export default CostForm;
