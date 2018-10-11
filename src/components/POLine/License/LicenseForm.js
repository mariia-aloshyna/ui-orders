import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, TextField, TextArea } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

class LicenseForm extends Component {
  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={6}>
              <div><em>- Please add agreements -</em></div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add</Button>
        </Col>
      </Row>
    );
  }

  renderSubForm = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={12} md={4}>
          <Field label="Name" name={`${elem}.name`} id={`${elem}.name`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="Discount %" name={`${elem}.discount`} id={`${elem}.discount`} type="number" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={4}>
          <Field label="URL" name={`${elem}.reference_url`} id={`${elem}.reference_url`} type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={10}>
          <Field label="Notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
        </Col>
        <Col xs={12} md={2} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Agreements" name="agreements" id="agreements" component={this.renderForm} />
        </Col>
      </Row>
    );
  }
}

export default LicenseForm;
