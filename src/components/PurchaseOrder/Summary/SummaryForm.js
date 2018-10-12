import React, { Component } from 'react';
import { Select, TextArea, TextField, Row, Col } from '@folio/stripes/components';
import { Field } from 'redux-form';
// import { Required } from '../../Utils/Validate';

class SummaryForm extends Component {
  static getDerivedStateFromProps(props, state) {
    const { parentResources } = props;
    const workflowStatus = (parentResources.workflowStatus || {}).records || [];
    const receiptStatus = (parentResources.receiptStatus || {}).records || [];
    if ((workflowStatus !== state.workflowStatus) || (receiptStatus !== state.receiptStatus)) {
      let workflowStatusArr = [];
      let receiptStatusArr = [];
      const obj = { label: '--- Select ---', value: '' };
      workflowStatusArr = workflowStatus.map((item) => {
        return { value: item.id, label: item.description };
      });
      receiptStatusArr = receiptStatus.map((item) => {
        return { value: item.id, label: item.description };
      });
      workflowStatusArr.unshift(obj);
      receiptStatusArr.unshift(obj);
      return { workflowStatus: workflowStatusArr, receiptStatus: receiptStatusArr };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

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
        {/* <Col xs={6} md={3}>
          <Field label="Transmission Date" name="transmission_date" id="transmission_date" dateFormat="YYYY-MM-DD" timeZone="UTC" backendDateStandard="YYYY-MM-DD" component={Datepicker} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Transmission Method" name="transmission_method" id="transmission_method" dateFormat="YYYY-MM-DD" timeZone="UTC" backendDateStandard="YYYY-MM-DD" component={Datepicker} fullWidth />
        </Col> */}
        <Col xs={6} md={3}>
          <Field label="Workflow Status" name="po_workflow_status_id" id="po_workflow_status_id" component={Select} dataOptions={this.state.workflowStatus} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="PO Receipt Status" name="po_receipt_status" id="po_receipt_status" component={Select} dataOptions={this.state.receiptStatus} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="PO Payment Status" name="po_payment_status" id="po_payment_status" component={Select} dataOptions={[]} fullWidth disabled />
        </Col>
        <Col xs={12}>
          <Field label="Comments" name="comments" id="comments" type="text" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
