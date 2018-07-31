import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { Required } from '../../Utils/Validate';

class AgreementsForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6} md={3}>
          <Field label="Approval Status" name="approval_status" id="approval_status" component={TextField} fullWidth disabled />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Receipt Status" name="receipt_status" id="receipt_status" type="text" component={TextField} fullWidth disabled />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Payment Status" name="payment_status" id="payment_status" type="text" component={TextField} fullWidth disabled />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Payment Receipt" name="sent" id="sent" type="data" component={TextField} fullWidth disabled />
        </Col>
        <Col xs={12}>
          <Field label="Comments" name="comments" id="comments" type="text" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default AgreementsForm;
