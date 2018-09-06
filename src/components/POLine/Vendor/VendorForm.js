import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextArea, TextField, Row, Col } from '@folio/stripes-components/';
// import { Required } from '../../Utils/Validate';

class VendorForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="Vendor Ref Number" name="ref_number" id="ref_number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Vendor Ref Type" name="ref_no_type" id="ref_no_type" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Instructions to Vendor" name="instructions" id="instructions" component={TextArea} style={{ height: '82px' }} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Vendor Account" name="vendor_account" id="vendor_account" component={TextField} fullWidth />
          <Field label="Note from vendor" name="note_from_vendor" id="note_from_vendor" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default VendorForm;
