import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  Col,
  Row,
  TextArea,
  TextField,
  Select,
} from '@folio/stripes/components';
import { requiredRefNumberType } from '../../Utils/Validate';
import FieldRefNumberType from './FieldRefNumberType';
import { EMPTY_OPTION } from '../../Utils/const';

class VendorForm extends Component {
  render() {
    const { accounts = [] } = this.props;
    const accountsDataOptions =
      accounts.map(({ accountNo }) => (
        {
          label: accountNo,
          value: accountNo,
        }));

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
            component={Select}
            dataOptions={[EMPTY_OPTION, ...accountsDataOptions]}
            fullWidth
            label={<FormattedMessage id="ui-orders.vendor.accountNumber" />}
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

VendorForm.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
};

export default VendorForm;
