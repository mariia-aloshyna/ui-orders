import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Checkbox, KeyValue, Row, Col } from '@folio/stripes/components';
// import FormatDate from '../../Utils/FormatDate';
// import css from './SummaryView.css';

const SummaryView = ({ order }) => (
  <Row>
    <Col xs={6}>
      <KeyValue label="Adjustments" value={null} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Total Units" value={_.get(order, 'total_items')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Approved">
        <Checkbox checked={_.get(order, ['approved'])} disabled />
      </KeyValue>
    </Col>
    <Col xs={6}>
      <KeyValue label="Total Estimated Price" value={_.get(order, 'total_estimated_price')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Payment Status" value={_.get(order, 'po_payment_status')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Workflow Status" value={_.get(order, 'workflow_status')} />
    </Col>
    <Col xs={12}>
      <KeyValue label="Notes" value={_.toString(_.get(order, 'notes'))} />
    </Col>
  </Row>
);

SummaryView.propTypes = {
  stripes: PropTypes.shape({
    intl: PropTypes.object.isRequired,
  }).isRequired,
  order: PropTypes.object,
};

export default SummaryView;
