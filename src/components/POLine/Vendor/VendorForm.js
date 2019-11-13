import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import {
  FieldRefNumberType,
  FieldVendorRefNumber,
  FieldVendorInstructions,
  FieldVendorAccountNumber,
} from '../../../common/POLFields';
import { isWorkflowStatusOpen } from '../../PurchaseOrder/util';

const VendorForm = ({
  accounts,
  order,
  vendorRefNumber,
  vendorRefNumberType,
}) => {
  const isOpenedOrder = isWorkflowStatusOpen(order);
  const accountsDataOptions = accounts.map(({ accountNo }) => ({
    label: accountNo,
    value: accountNo,
  }));
  const isVendorRefNumberRequired = Boolean(vendorRefNumberType);
  const isVendorRefNumberTypeRequired = Boolean(vendorRefNumber);

  return (
    <Row>
      <Col
        xs={6}
        md={3}
      >
        <FieldVendorRefNumber required={isVendorRefNumberRequired} />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldRefNumberType required={isVendorRefNumberTypeRequired} />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldVendorAccountNumber
          accounts={accountsDataOptions}
          disabled={isOpenedOrder}
        />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldVendorInstructions disabled={isOpenedOrder} />
      </Col>
    </Row>
  );
};

VendorForm.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.object.isRequired,
  vendorRefNumberType: PropTypes.string,
  vendorRefNumber: PropTypes.string,
};

VendorForm.defaultProps = {
  accounts: [],
};

export default VendorForm;
