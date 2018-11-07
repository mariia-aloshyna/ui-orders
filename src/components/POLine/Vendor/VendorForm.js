import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, TextArea, TextField, Row, Col } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

class VendorForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        refNumberTypeDD: PropTypes.array
      })
    })
  }

  render() {
    const refNumberTypeDD = (this.props.parentResources.dropdown || {}).refNumberTypeDD || [];
    return (
      <Row>
        <Col xs={6}>
          <Field label="Vendor Ref Number" name="vendor_detail.ref_number" id="vendor_detail.ref_number" component={TextField} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Vendor Ref Type&#42;" name="vendor_detail.ref_number_type" id="vendor_detail.ref_number_type" component={Select} validate={[Required]} dataOptions={refNumberTypeDD} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Instructions To Vendor&#42;" name="vendor_detail.instructions" id="vendor_detail.instructions" component={TextArea} validate={[Required]} style={{ height: '82px' }} fullWidth />
        </Col>
        <Col xs={6}>
          <Field label="Vendor Account" name="vendor_detail.vendor_account" id="vendor_detail.vendor_account" component={TextField} fullWidth />
          <Field label="Note From Vendor" name="vendor_detail.note_from_vendor" id="vendor_detail.note_from_vendor" component={TextField} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default VendorForm;
