import React, { Component } from 'react';
import { Field } from 'redux-form';
import get from 'lodash/get';
import { Row, Col, Datepicker, TextField, Checkbox, Select } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';
import css from './EresourcesForm.css';

class EresourcesForm extends Component {
  render() {
    const vendors = get(this.props, 'parentResources.vendors.records', []).map((v) => ({
      label: v.name,
      value: v.name,
    }));

    return (
      <Row>
        <Col xs={6} md={3}>
          <Field
            component={Select}
            dataOptions={vendors}
            fullWidth
            id="eresource.access_provider"
            label="Access Provider&#42;"
            name="eresource.access_provider"
            validate={[Required]}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            id="activated"
            label="Activation Status"
            name="eresource.activated"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="activation_due"
            label="Activation Due"
            name="eresource.activation_due"
            type="number"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            id="create_inventory"
            label="Create Item"
            name="eresource.create_inventory"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            id="trial"
            label="Trial"
            name="eresource.trial"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            dateFormat="YYYY-MM-DD"
            fullWidth
            id="expected_activation"
            label="Expected Activation"
            name="eresource.expected_activation"
            timeZone="UTC"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="user_limit"
            label="User Limit"
            name="eresource.user_limit"
            type="number"
          />
        </Col>
      </Row>
    );
  }
}

export default EresourcesForm;
