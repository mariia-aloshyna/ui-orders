import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
  getFormValues,
} from 'redux-form';
import { get } from 'lodash';
import {
  Button,
  Col,
  KeyValue,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

class FundDistributionForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      fund: PropTypes.object
    }),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.addFields = this.addFields.bind(this);
    this.removeFields = this.removeFields.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.calculateAmount = this.calculateAmount.bind(this);
  }

  addFields(fields) {
    fields.push({});
  }

  removeFields(fields, index) {
    fields.remove(index);
  }

  onChangeInput(e, propertyName) {
    const { dispatch, change } = this.props;
    dispatch(change(propertyName, e));
  }

  calculateAmount(index) {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('POLineForm')(store.getState());
    const listPrice = parseFloat(formValues.cost.list_price);
    const quantityPhysical = parseInt(formValues.cost.quantity_physical, 10) || 0;
    const quantityElectronic = parseInt(formValues.cost.quantity_electronic, 10) || 0;
    const estimatedPrice = listPrice * (quantityPhysical + quantityElectronic);
    const fundDistributionPercentage = parseInt(formValues.fund_distribution[index].percentage, 10) || 0;
    const amount = parseFloat((fundDistributionPercentage / 100) * estimatedPrice).toFixed(2);
    return amount;
  }

  renderForm({ fields }) {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={6}>
              <div>
                <em>
                  <FormattedMessage id="ui-orders.fundDistribution.add" />
                </em>
              </div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => this.addFields(fields)}>
            <FormattedMessage id="ui-orders.fundDistribution.addBtn" />
          </Button>
        </Col>
      </Row>
    );
  }

  renderSubForm(elem, index, fields) {
    const { parentResources } = this.props;
    const funds = get(parentResources, ['fund', 'records'], []).map((fund) => ({
      label: fund.name,
      value: fund.id,
    }));

    return (
      <Row key={index}>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={funds}
            fullWidth
            label={<FormattedMessage id="ui-orders.fundDistribution.id" />}
            name={`${elem}.id`}
            validate={[Required]}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.fundDistribution.percent" />}
            name={`${elem}.percentage`}
            type="number"
            onChange={e => this.onChangeInput(e.target.value, 'fund_distribution.percentage')}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.fundDistribution.code" />}
            name={`${elem}.code`}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.fundDistribution.amount" />}
            value={this.calculateAmount(index)}
          />
        </Col>
        <Col
          xs={6}
        >
          <br />
          <Button
            onClick={() => this.removeFields(fields, index)}
            buttonStyle="danger"
          >
            <FormattedMessage id="ui-orders.fundDistribution.removeBtn" />
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray
            label="fund_distribution"
            name="fund_distribution"
            component={this.renderForm}
          />
        </Col>
      </Row>
    );
  }
}

export default FundDistributionForm;
