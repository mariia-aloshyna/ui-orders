import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldRefNumberType,
  FieldVendorRefNumber,
  FieldVendorInstructions,
  FieldVendorAccountNumber,
} from '../../../../common/POLFields';

const POLineVendorForm = ({ accounts }) => {
  return (
    <Row>
      <Col
        xs={3}
        data-col-order-template-vendor-number
      >
        <FieldVendorRefNumber required={false} />
      </Col>

      <Col
        xs={3}
        data-col-order-template-vendor-ref-type
      >
        <FieldRefNumberType required={false} />
      </Col>

      <Col
        xs={3}
        data-col-order-template-vendor-account
      >
        <FieldVendorAccountNumber accounts={accounts} />
      </Col>

      <Col
        xs={3}
        data-col-order-template-vendor-instruction
      >
        <FieldVendorInstructions />
      </Col>
    </Row>
  );
};

POLineVendorForm.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
};

POLineVendorForm.defaultProps = {
  accounts: [],
};

export default POLineVendorForm;
