import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextArea, TextField, Row, Col, Checkbox } from '@folio/stripes/components';
import { Field } from 'redux-form';
import FieldWorkflowStatus from './FieldWorkflowStatus';

class SummaryForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Field
            component={TextField}
            fullWidth
            id="total_items"
            label={<FormattedMessage id="ui-orders.orderSummary.totalUnits" />}
            name="total_items"
            type="number"
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
          />
        </Col>
        <Col xs={6} md={3}>
          <FieldWorkflowStatus />
        </Col>
        <Col xs={12}>
          <Field
            component={TextArea}
            fullWidth
            id="notes"
            label={<FormattedMessage id="ui-orders.orderSummary.notes" />}
            name="notes"
            type="text"
          />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
