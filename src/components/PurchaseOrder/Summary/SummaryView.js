import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import {
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import { WORKFLOW_STATUS } from './FieldWorkflowStatus';
// import css from './SummaryView.css';

const SummaryView = ({ order }) => {
  const workflowStatus = get(order, 'workflow_status');

  return (
    <Fragment>
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
            value={workflowStatus}
          />
        </Col>
      </Row>
      {(workflowStatus === WORKFLOW_STATUS.closed) && (
        <Row>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.orderSummary.closingReason" />}
              value={get(order, ['close_reason', 'reason'])}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.orderSummary.closingNote" />}
              value={get(order, ['close_reason', 'note'])}
            />
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

SummaryView.propTypes = {
  order: PropTypes.object,
};

SummaryView.defaultProps = {
  order: {},
};

SummaryView.displayName = 'SummaryView';

export default SummaryView;
