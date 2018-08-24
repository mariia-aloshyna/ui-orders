import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { Required } from '../../Utils/Validate';

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
