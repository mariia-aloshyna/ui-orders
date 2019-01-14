import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  Col,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { requiredRefNumberType } from '../../Utils/Validate';
import FieldRefNumberType from './FieldRefNumberType';

class VendorForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id="vendor_detail.ref_number"
            label={<FormattedMessage id="ui-orders.vendor.refNumber" />}
            name="vendor_detail.ref_number"
            validate={[requiredRefNumberType]}
          />
        </Col>
        <Col xs={6}>
          <FieldRefNumberType />
        </Col>
        <Col xs={6}>
          <Field
            component={TextArea}
            fullWidth
            id="vendor_detail.instructions"
            label={<FormattedMessage id="ui-orders.vendor.instructions" />}
            name="vendor_detail.instructions"
            style={{ height: '82px' }}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            id="vendor_detail.vendor_account"
            label={<FormattedMessage id="ui-orders.vendor.vendorAccount" />}
            name="vendor_detail.vendor_account"
          />
          <Field
            component={TextField}
            fullWidth
            id="vendor_detail.note_from_vendor"
            label={<FormattedMessage id="ui-orders.vendor.noteFromVendor" />}
            name="vendor_detail.note_from_vendor"
          />
        </Col>
      </Row>
    );
  }
}

export default VendorForm;
