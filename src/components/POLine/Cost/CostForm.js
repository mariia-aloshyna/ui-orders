import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextField, Row, Col } from '@folio/stripes-components/';
import { Required } from '../../Utils/Validate';

class CostForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="List Unit Price" name="list_price" id="list_price" validate={[Required]} type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Currency" name="currency" id="currency" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Quantity Ordered" name="quantity" id="quantity" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Estimated Price" name="estimated_price" id="estimated_price" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Format" name="format" id="format" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default CostForm;
