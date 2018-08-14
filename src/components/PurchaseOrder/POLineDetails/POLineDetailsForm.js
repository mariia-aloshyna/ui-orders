import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form'
import { Select, Checkbox, TextArea, Button, Row, Col, TextField } from '@folio/stripes-components';
import { Required } from '../../Utils/Validate';

class LineDetailsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        acquisitionMethodDD: PropTypes.Object,
        orderFormatDD: PropTypes.Object,
        status_dd: PropTypes.Object,
        order_type_dd: PropTypes.Object
      })
    })
  }

  render() {
    const acquisitionMethodDD = (this.props.parentResources.dropdown || {}).acquisitionMethodDD || [];
    const orderFormatDD = (this.props.parentResources.dropdown || {}).orderFormatDD || [];
    const statusDD = (this.props.parentResources.dropdown || {}).statusDD || [];
    const orderTypeDD = (this.props.parentResources.dropdown || {}).orderTypeDD || [];

    return (
      <Row>
        <Col xs={6}>
          <Field label="PO Number" name="po_number" id="po_number" type="text" component={TextField} validate={[Required]} fullWidth disabled readOnly />
        </Col>
        <Col xs={6}>
          <Field label="Acquisition Method" name="acquisition_method" id="acquisition_method" type="select" component={Select} dataOptions={acquisitionMethodDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Owner" name="owner" id="owner" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Format" name="format" id="format" type="select" component={Select} dataOptions={orderFormatDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Status" name="status" id="status" type="select" component={Select} dataOptions={statusDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Type" name="type" id="type" type="select" component={Select} dataOptions={orderTypeDD}  fullWidth />
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
