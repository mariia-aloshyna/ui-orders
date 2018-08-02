import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import Select from '@folio/stripes-components/lib/Select';
import { Required } from '../../Utils/Validate';

class LineDetailsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object
    })
  }

  getAcquisitionMethodDD() {
    return (this.props.parentResources.dropdown || {}).acquisition_method_dd || [];
  }

  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field label="Acquisition Method" name="acquisition_method" id="acquisition_method" type="select" component={Select} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Owner" name="owner" id="owner" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Format" name="format" id="format" type="select" component={Select} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Status" name="status" id="status" type="select" component={Select} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Type" name="type" id="type" type="select" component={Select} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Created on" name="recorded" id="recorded" type="date" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Receipt Date" name="receipt_date" id="receipt_date" type="date" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Source" name="source" id="source" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Donor" name="donor" id="donor" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Selector" name="selector" id="selector" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Requester" name="requester" id="requester" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={12}>
          <Row>
            <Col xs={3}>
              <Field label="Rush" name="rush" id="rush" type="text" component={Checkbox} fullWidth />
            </Col>
            <Col xs={3}>
              <Field label="Manual Batching" name="manual_batching" id="manual_batching" component={Checkbox} fullWidth />
            </Col>
            <Col xs={3}>
              <Field label="Collection" name="collection" id="collection" type="text" component={Checkbox} fullWidth />
            </Col>
            <Col xs={3}>
              <Field label="Cancellation Restriction" name="cancellation_restriction" id="cancellation_restriction" component={Checkbox} fullWidth />
            </Col>
            <br />
            <br />
          </Row>
        </Col>
        <Col xs={12}>
          <Field label="Line Description" name="line_description" id="line_description" component={TextArea} fullWidth />
        </Col>
        <Col xs={12}>
          <Field label="Comments" name="comments" id="comments" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default LineDetailsForm;
