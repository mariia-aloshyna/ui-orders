import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import {
  FieldRenewalInterval,
  FieldRenewalDate,
  FieldRenewalPeriod,
  FieldIsManualRenewal,
} from '../../../common/POFields';

import { isWorkflowStatusOpen } from '../util';

const RenewalsForm = ({ order }) => {
  const isOpenedOrder = isWorkflowStatusOpen(order);

  return (
    <Row>
      <Col
        xs={6}
        md={3}
      >
        <FieldRenewalInterval disabled={isOpenedOrder} />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldRenewalDate disabled={isOpenedOrder} />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldRenewalPeriod disabled={isOpenedOrder} />
      </Col>
      <Col
        xs={6}
        md={3}
      >
        <FieldIsManualRenewal disabled={isOpenedOrder} />
      </Col>
    </Row>
  );
};

RenewalsForm.propTypes = {
  order: PropTypes.object.isRequired,
};

export default RenewalsForm;
