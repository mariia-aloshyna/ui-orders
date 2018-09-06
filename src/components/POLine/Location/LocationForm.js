import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { TextField, Button, Row, Col } from '@folio/stripes-components/';

class LocationForm extends Component {
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
              <div><em>- Please add location -</em></div>
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
    const rowCount = (fields.length - 1) !== index;

    return (
      <Row key={index}>
        <Col xs={6}>
          <Field label="Name" name="name" id="name" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Quantity Electronic" name="quantity_electronic" id="quantity_electronic" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Quantity Physical" name="quantity_physical" id="quantity_physical" component={TextField} fullWidth />
        </Col>
        <Col xs={6} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
        {rowCount &&
          <Col xs={12}>
            <hr />
          </Col>
        }
      </Row>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Locations" name="locataions" id="locataions" component={this.renderForm} />
        </Col>
      </Row>
    );
  }
}

export default LocationForm;
