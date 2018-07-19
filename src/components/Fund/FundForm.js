import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { Required } from '../../Utils/Validate';

class FundForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="Fund ID" name="fund_id" id="fund_id" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Amount" name="amount" id="amount" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Percent" name="percent" id="percent" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default FundForm;
