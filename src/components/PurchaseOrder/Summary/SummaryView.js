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
// import css from './SummaryView.css';

const SummaryView = ({ order }) => (
  <Row>
    <Col xs={6}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.orderSummary.totalUnits" />}
        value={get(order, 'total_items')}
      />
    </Col>
    <Col xs={6}>
      <KeyValue label={<FormattedMessage id="ui-orders.orderSummary.approved" />}>
        <Checkbox
          checked={get(order, ['approved'])}
          disabled
        />
      </KeyValue>
    </Col>
    <Col xs={6}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.orderSummary.totalEstimatedPrice" />}
        value={get(order, 'total_estimated_price')}
      />
    </Col>
    <Col xs={6}>
      <KeyValue
        label={<FormattedMessage id="ui-orders.orderSummary.workflowStatus" />}
        value={get(order, 'workflow_status')}
      />
    </Col>

  </Row>
);

SummaryView.propTypes = {
  order: PropTypes.object,
};

SummaryView.displayName = 'SummaryView';

export default SummaryView;
