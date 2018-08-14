import React, { Component } from 'react';
import { Datepicker, TextArea, TextField, Button, Row, Col } from '@folio/stripes-components/';
import { Field, FieldArray } from 'redux-form';
import { Required } from '../../Utils/Validate';

class SummaryForm extends Component {

  render() {       
    return (
      <Row>
        <Col xs={6} md={3}>
          <Field label="Total Items" name="total_items" id="total_items" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Adjustments" name="adjustments" id="adjustments" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Total Estimated Price" name="total_estimated_price" id="total_estimated_price" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Transmission Date" name="transmission_date" id="transmission_date" dateFormat="YYYY-MM-DD" timeZone="UTC" backendDateStandard="YYYY-MM-DD" component={Datepicker} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Transmission Method" name="transmission_method" id="transmission_method" dateFormat="YYYY-MM-DD" timeZone="UTC" backendDateStandard="YYYY-MM-DD" component={Datepicker} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Workflow Status" name="po_workflow_status_id" id="po_workflow_status_id" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="PO Receipt Status" name="po_receipt_status" id="po_receipt_status" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="PO Payment Status" name="po_payment_status" id="po_payment_status" component={TextField} fullWidth />
        </Col>
        <Col xs={12}>
          <Field label="Comments" name="comments" id="comments" type="text" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
