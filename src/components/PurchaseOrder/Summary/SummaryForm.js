import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextField, Row, Col, Checkbox } from '@folio/stripes/components';
import { Field } from 'redux-form';
import FieldWorkflowStatus from './FieldWorkflowStatus';
import { required } from '../../Utils/Validate';

class SummaryForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="total_items"
            label={<FormattedMessage id="ui-orders.orderSummary.totalUnits" />}
            name="total_items"
            type="number"
            validate={required}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-orders.orderSummary.approved" />}
            name="approved"
            type="checkbox"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="total_estimated_price"
            label={<FormattedMessage id="ui-orders.orderSummary.totalEstimatedPrice" />}
            name="total_estimated_price"
            type="number"
            validate={required}
          />
        </Col>
        <Col xs={6} md={3}>
          <FieldWorkflowStatus />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
