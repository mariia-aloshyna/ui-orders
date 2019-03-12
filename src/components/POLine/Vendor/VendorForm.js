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
            label={<FormattedMessage id="ui-orders.vendor.refNumber" />}
            name="vendorDetail.refNumber"
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
            label={<FormattedMessage id="ui-orders.vendor.instructions" />}
            name="vendorDetail.instructions"
            style={{ height: '82px' }}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.vendor.vendorAccount" />}
            name="vendorDetail.vendorAccount"
          />
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.vendor.noteFromVendor" />}
            name="vendorDetail.noteFromVendor"
          />
        </Col>
      </Row>
    );
  }
}

export default VendorForm;
