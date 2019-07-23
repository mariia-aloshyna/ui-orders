import React from 'react';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldRenewalInterval,
  FieldRenewalDate,
  FieldRenewalPeriod,
  FieldIsManualRenewal,
} from '../../../../common/POFields';

const PurchaseOrderRenewalsForm = () => {
  return (
    <Row start="xs">
      <Col
        xs={3}
        data-col-order-template-renewal-interval
      >
        <FieldRenewalInterval required={false} />
      </Col>

      <Col
        xs={3}
        data-col-order-template-renewal-date
      >
        <FieldRenewalDate required={false} />
      </Col>

      <Col
        xs={3}
        data-col-order-template-renewal-period
      >
        <FieldRenewalPeriod />
      </Col>

      <Col
        xs={3}
        data-col-order-template-renewal-is-manual
      >
        <FieldIsManualRenewal />
      </Col>
    </Row>
  );
};

export default PurchaseOrderRenewalsForm;
