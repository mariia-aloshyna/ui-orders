import React, { Component } from 'react';
import { Checkbox, TextField, Row, Col } from '@folio/stripes/components';
import { Field } from 'redux-form';

class AdjustmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="Shipment" name="shipment" id="shipment" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Discount" name="discount" id="discount" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Insurance" name="insurance" id="insurance" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Overhead" name="overhead" id="overhead" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Tax 1" name="tax_1" id="tax_1" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Credit" name="credit" id="credit" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Tax 2" name="tax_2" id="tax_2" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <br />
          <Field label="Use Pro Rate" name="use_pro_rate" id="use_pro_rate" component={Checkbox} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default AdjustmentForm;
