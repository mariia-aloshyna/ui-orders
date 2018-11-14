import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Checkbox, Row, Col, KeyValue } from '@folio/stripes/components';

const AdjustmentView = ({ order }) => (
  <Row>
    <Col xs={6}>
      <KeyValue label="Shipment" value={_.get(order.adjustment, 'shipment')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Discount" value={_.get(order.adjustment, 'discount')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Insurance" value={_.get(order.adjustment, 'insurance')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Overhead" value={_.get(order.adjustment, 'overhead')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Tax 1" value={_.get(order.adjustment, 'tax_1')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Credit" value={_.get(order.adjustment, 'credit')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Tax 2" value={_.get(order.adjustment, 'tax_2')} />
    </Col>
    <Col xs={6}>
      <KeyValue label="Use Pro Rate">
        <Checkbox checked={_.get(order.adjustment, ['use_pro_rate'])} disabled />
      </KeyValue>
    </Col>
  </Row>
);

AdjustmentView.propTypes = {
  order: PropTypes.object,
};

AdjustmentView.displayName = 'AdjustmentView';

export default AdjustmentView;
