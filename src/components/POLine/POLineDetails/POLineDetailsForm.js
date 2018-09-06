import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, Checkbox, TextArea, Row, Col, TextField } from '@folio/stripes-components';
import { Required } from '../../Utils/Validate';

class LineDetailsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        acquisitionMethodDD: PropTypes.object,
        orderFormatDD: PropTypes.object,
        status_dd: PropTypes.object,
        order_type_dd: PropTypes.object
      })
    })
  }

  render() {
    const acquisitionMethodDD = (this.props.parentResources.dropdown || {}).acquisitionMethodDD || [];
    const orderFormatDD = (this.props.parentResources.dropdown || {}).orderFormatDD || [];
    const statusDD = (this.props.parentResources.dropdown || {}).statusDD || [];
    const orderTypeDD = (this.props.parentResources.dropdown || {}).orderTypeDD || [];
    const sourceDD = (this.props.parentResources.dropdown || {}).sourceDD || [];
    return (
      <Row>
        <Col xs={6}>
          <Field label="PO Number" name="purchase_order_id" id="purchase_order_id" type="text" component={TextField} validate={[Required]} fullWidth readOnly />
        </Col>
        <Col xs={6}>
          <Field label="Acquisition Method" name="acquisition_method" id="acquisition_method" type="select" component={Select} dataOptions={acquisitionMethodDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Barcode" name="barcode" id="barcode" component={TextField} validate={[Required]} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Owner" name="owner" id="owner" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Format" name="order_format" id="order_format" type="select" component={Select} dataOptions={orderFormatDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Receipt Status" name="receipt_status" id="receipt_status" type="select" component={Select} dataOptions={statusDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Type" name="order_type" id="order_type" type="select" component={Select} dataOptions={orderTypeDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Receipt Date" name="receipt_date" id="receipt_date" type="date" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Source" name="source" id="source" type="select" component={Select} dataOptions={sourceDD} fullWidth />
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
        <Col xs={6}>
          <Field label="Collection" name="collection" id="collection" component={Checkbox} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Cancellation Restriction" name="cancellation_restriction" id="cancellation_restriction" component={Checkbox} fullWidth />
        </Col>
        <Col xs={12}>
          <br />
          <Field label="Line Description" name="po_line_description" id="po_line_description" component={TextArea} fullWidth />
        </Col>
        <Col xs={12}>
          <Field label="Cancellation Restriction Comment" name="cancellation_restriction_comment" id="cancellation_restriction_comment" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default LineDetailsForm;
