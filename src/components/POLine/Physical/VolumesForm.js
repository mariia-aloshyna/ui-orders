import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';
import {
  Button,
  Col,
  Row,
  TextField,
} from '@folio/stripes/components';

class VolumesForm extends Component {
  constructor(props) {
    super(props);
    this.addFields = this.addFields.bind(this);
    this.removeFields = this.removeFields.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  addFields(fields) {
    fields.push('');
  }

  removeFields(fields, index) {
    fields.remove(index);
  }

  renderForm({ fields }) {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={12}>
              <div>
                <em>
                  <FormattedMessage id="ui-orders.physical.addVolume" />
                </em>
              </div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => this.addFields(fields)}>
            <FormattedMessage id="ui-orders.physical.addVolumeBtn" />
          </Button>
        </Col>
      </Row>
    );
  }

  renderSubForm(elem, index, fields) {
    return (
      <Row key={index}>
        <Col xs={10}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.physical.volume" />}
            name={elem}
          />
        </Col>
        <Col xs={2} style={{ paddingTop: '4px' }}>
          <br />
          <Button
            onClick={() => this.removeFields(fields, index)}
            buttonStyle="danger"
          >
            {<FormattedMessage id="ui-orders.physical.removeBtn" />}
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <FieldArray
        component={this.renderForm}
        label="physical.volumes"
        name="physical.volumes"
      />
    );
  }
}

export default VolumesForm;