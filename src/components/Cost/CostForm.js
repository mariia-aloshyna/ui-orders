import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import Select from '@folio/stripes-components/lib/Select';
import { Required } from '../../Utils/Validate';

class CostForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="List Unit Price" name="list_price" id="list_price" validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Currency" name="currency" id="currency" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Quantity Ordered" name="quantity" id="quantity" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Format" name="format" id="format" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default CostForm;
