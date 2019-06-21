import React from 'react';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldIsApproved,
} from '../../../../common/POFields';

const PurchaseOrderSummaryForm = () => {
  return (
    <Row start="xs">
      <Col xs={12}>
        <FieldIsApproved />
      </Col>
    </Row>
  );
};

export default PurchaseOrderSummaryForm;
