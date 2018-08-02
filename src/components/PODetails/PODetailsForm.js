import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Select, TextField, Row, Col, Datepicker } from '@folio/stripes-components';
import { Required } from '../../Utils/Validate';

class PODetailsForm extends Component {
  static propTypes = {
    user: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired
  }

  static getDerivedStateFromProps(props, state) {
    const { user: { user: { id } } } = this.props;
    if (props.initialize.id) {
      if (props.initialize.created_by !== state.created_by) {
        props.initialize({ created_by: id });
        return { created_by: id };
      }
    }
    return false;
  }

  render() {
    return (
      <Row>
        <Col xs={6} md={3}>
          <Field label="Vendor" name="vendor" id="vendor" component={TextField} fullWidth disabled />
        </Col>
        <Col xs={6} md={3}>
          <Field label="PO Number" name="po_number" id="po_number" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created On" name="created" id="created" type="date" component={Datepicker} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created By" name="created_by" id="created_by" type="text" component={TextField} fullWidth readOnly />
        </Col>
      </Row>
    );
  }
}

export default PODetailsForm;
