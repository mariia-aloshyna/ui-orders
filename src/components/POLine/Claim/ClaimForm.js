import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextField, Row, Col, Checkbox } from '@folio/stripes/components';
// import { Required } from '../../Utils/Validate';

class FundForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="Claim" name="claim" id="claim" component={Checkbox} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Claim Sent" name="sent" id="sent" type="date" component={TextField} fullWidth />
        </Col>
        <Col xsOffset={6} xs={6}>
          <Field label="Claim Grace" name="grace" id="grace" type="date" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default FundForm;
