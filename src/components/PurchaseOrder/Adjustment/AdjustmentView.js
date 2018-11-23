import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const AdjustmentView = ({ order }) => (
  <Row>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.shipment" />}
        value={get(order.adjustment, 'shipment')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.discount" />}
        value={get(order.adjustment, 'discount')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.insurance" />}
        value={get(order.adjustment, 'insurance')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.overhead" />}
        value={get(order.adjustment, 'overhead')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.tax_1" />}
        value={get(order.adjustment, 'tax_1')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.credit" />}
        value={get(order.adjustment, 'credit')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.adjustment.tax_2" />}
        value={get(order.adjustment, 'tax_2')}
      />
    </Col>
    <Col xs={6} md={3}>
      <KeyValue label={<FormattedMessage id="ui-orders.adjustment.use_pro_rate" />}>
        <Checkbox
          checked={get(order.adjustment, 'use_pro_rate')}
          disabled
        />
      </KeyValue>
    </Col>
  </Row>
);

AdjustmentView.propTypes = {
  order: PropTypes.object,
};

AdjustmentView.displayName = 'AdjustmentView';

export default AdjustmentView;
