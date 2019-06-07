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

import { isWorkflowStatusOpen } from '../../PurchaseOrder/util';
import { requiredRefNumberType } from '../../Utils/Validate';
import { EMPTY_OPTION } from '../../Utils/const';

import FieldRefNumberType from './FieldRefNumberType';

class VendorForm extends Component {
  render() {
    const { order, accounts = [] } = this.props;
    const isOpenedOrder = isWorkflowStatusOpen(order);
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
            disabled={isOpenedOrder}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[EMPTY_OPTION, ...accountsDataOptions]}
            fullWidth
            label={<FormattedMessage id="ui-orders.vendor.accountNumber" />}
            name="vendorDetail.vendorAccount"
            disabled={isOpenedOrder}
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
  order: PropTypes.object.isRequired,
};

export default VendorForm;
