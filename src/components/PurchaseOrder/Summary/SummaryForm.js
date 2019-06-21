import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';

import { FieldIsApproved } from '../../../common/POFields';
import { isWorkflowStatusOpen } from '../util';
import FieldWorkflowStatus from './FieldWorkflowStatus';

const SummaryForm = ({ initialValues: order }) => (
  <Row>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.orderSummary.totalUnits" />}
        value={order.totalItems}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.orderSummary.totalEstimatedPrice" />}
        value={order.totalEstimatedPrice}
      />
    </Col>
    <Col xs={6} md={3}>
      <br />
      <FieldIsApproved disabled={isWorkflowStatusOpen(order)} />
    </Col>
    <Col xs={6} md={3}>
      <FieldWorkflowStatus />
    </Col>
  </Row>
);

SummaryForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
};

export default SummaryForm;
