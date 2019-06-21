import React from 'react';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldPrefix,
  FieldSuffix,
  FieldVendor,
  FieldBillTo,
  FieldShipTo,
  FieldIsManualPO,
  FieldIsReEncumber,
} from '../../../../common/POFields';
import FieldOrderType from '../../../../components/PurchaseOrder/PODetails/FieldOrderType';

const PurchaseOrderInformationForm = () => {
  return (
    <Row>
      <Col
        xs={3}
        data-col-orde-template-prefix
      >
        <FieldPrefix prefixes={[]} />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-suffix
      >
        <FieldSuffix suffixes={[]} />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-vendor
      >
        <FieldVendor vendors={[]} />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-assign-to
      >
        Assign to (TBD)
      </Col>

      <Col
        xs={3}
        data-col-orde-template-bill-to
      >
        <FieldBillTo addresses={[]} />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-ship-to
      >
        <FieldShipTo addresses={[]} />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-order-type
      >
        <FieldOrderType />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-manual
      >
        <FieldIsManualPO />
      </Col>

      <Col
        xs={3}
        data-col-orde-template-reencumber
      >
        <FieldIsReEncumber />
      </Col>
    </Row>
  );
};

export default PurchaseOrderInformationForm;
