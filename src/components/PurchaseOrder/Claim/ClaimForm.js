import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { Required } from '../../Utils/Validate';

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
