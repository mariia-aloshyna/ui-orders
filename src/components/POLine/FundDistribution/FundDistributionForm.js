import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  FieldArray,
} from 'redux-form';
import get from 'lodash/get';
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
    order: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.addFields = this.addFields.bind(this);
    this.removeFields = this.removeFields.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  addFields(fields) {
    fields.push({});
  }

  removeFields(fields, index) {
    fields.remove(index);
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
    const { order } = this.props;
    const fundDistributionPercentage = get(order, ['fund_distribution', index, 'percentage'], 0);
    const estimatedPrice = get(order, ['cost', 'po_line_estimated_price'], 0);
    const amount = (fundDistributionPercentage / 100) * estimatedPrice;

    return (
      <Row key={index}>
        <Col xs={6}>
          <Field
            component={Select}
            fullWidth
            id={`${elem}.id`}
            label={<FormattedMessage id="ui-orders.fundDistribution.id" />}
            name={`${elem}.id`}
            validate={[Required]}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id={`${elem}.percentage`}
            label={<FormattedMessage id="ui-orders.fundDistribution.percent" />}
            name={`${elem}.percentage`}
            type="number"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id={`${elem}.code`}
            label={<FormattedMessage id="ui-orders.fundDistribution.code" />}
            name={`${elem}.code`}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id={`${elem}.encumbrance`}
            label={<FormattedMessage id="ui-orders.fundDistribution.encumbrance" />}
            name={`${elem}.encumbrance`}
            readOnly
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.fundDistribution.amount" />}
            value={amount}
          />
        </Col>
        <Col
          xs={6}
          style={{ textAlign: 'right' }}
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
            id="fund_distribution"
            component={this.renderForm}
          />
        </Col>
      </Row>
    );
  }
}

export default FundDistributionForm;
