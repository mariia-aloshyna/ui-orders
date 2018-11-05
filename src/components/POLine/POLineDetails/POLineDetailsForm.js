import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, Checkbox, TextArea, Row, Col, TextField } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

class LineDetailsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        acquisitionMethodDD: PropTypes.array,
        orderFormatDD: PropTypes.array,
        status_dd: PropTypes.array,
        order_type_dd: PropTypes.array
      })
    })
  }

  render() {
    const acquisitionMethodDD = (this.props.parentResources.dropdown || {}).acquisitionMethodDD || [];
    const orderFormatDD = (this.props.parentResources.dropdown || {}).orderFormatDD || [];
    const receiptStatusDD = (this.props.parentResources.dropdown || {}).receiptStatusDD || [];
    return (
      <Row>
        <Col xs={6}>
          <Field label="PO Line ID" name="po_line_id" id="po_line_id" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Acquisition Method&#42;" name="acquisition_method" id="acquisition_method" type="select" component={Select} dataOptions={acquisitionMethodDD} validate={[Required]} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Owner" name="owner" id="owner" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Order Format&#42;" name="order_format" id="order_format" type="select" component={Select} dataOptions={orderFormatDD} validate={[Required]} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Status" name="receipt_status" id="receipt_status" type="select" component={Select} dataOptions={receiptStatusDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Receipt Date" name="receipt_date" id="receipt_date" type="date" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Donor" name="donor" id="donor" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6} />
        <Col xs={3}>
          <Field label="Cancellation Restriction" name="cancellation_restriction" id="cancellation_restriction" component={Checkbox} fullWidth />
        </Col>
        <Col xs={3}>
          <Field label="Rush" name="rush" id="rush" component={Checkbox} fullWidth />
        </Col>
        <Col xs={3}>
          <Field label="Collection" name="collection" id="collection" component={Checkbox} fullWidth />
        </Col>
        <Col xs={6}>
          <br />
          <Field label="Selector" name="selector" id="selector" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <br />
          <Field label="Requester" name="requester" id="requester" type="text" component={TextField} fullWidth />
        </Col>
        <Col xs={12}>
          <Field label="Comments" name="po_line_description" id="po_line_description" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default LineDetailsForm;
