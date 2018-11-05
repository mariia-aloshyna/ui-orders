import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, TextArea, TextField, Row, Col, Checkbox } from '@folio/stripes/components';
import { Field } from 'redux-form';
// import { Required } from '../../Utils/Validate';

class SummaryForm extends Component {
  static propTypes = {
    parentResources: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const workflowStatusDD = (this.props.parentResources.dropdown || {}).workflowStatusDD || [];
    return (
      <Row>
        <Col xs={12}>
          <Field label="Total Units" name="total_items" id="total_items" type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Approved" name="approved" id="approved" component={Checkbox} labelPlacement="top" />
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
          <Field label="Workflow Status" name="workflow_status" id="workflow_status" component={Select} dataOptions={workflowStatusDD} fullWidth />
        </Col>
        <Col xs={12}>
          <Field label="Notes" name="notes" id="notes" type="text" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
