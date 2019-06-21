import React from 'react';

import {
  Row,
  Col,
} from '@folio/stripes/components';

import {
  FieldsNotes,
} from '../../../../common/POFields';

const PurchaseOrderNotesForm = () => {
  return (
    <Row start="xs">
      <Col xs={12}>
        <FieldsNotes />
      </Col>
    </Row>
  );
};

export default PurchaseOrderNotesForm;
