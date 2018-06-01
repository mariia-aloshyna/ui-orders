import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import { Required } from '../../Utils/Validate';

class PODetailsForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6} md={3}>
          <Field label="Vendor" name="vendor" id="vendor" validate={[Required]} component={Select} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="PO Number" name="po_number" id="po_number" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created On" name="created" id="created" type="date" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created By" name="created_by" id="created_by" type="date" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default PODetailsForm;
