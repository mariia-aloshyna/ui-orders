import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedDate,
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const RenewalsView = ({ order: { renewal = {} } }) => {
  return (
    <Row>
      <Col xs={6}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.renewals.renewalInterval" />}
          value={renewal.interval}
        />
      </Col>
      <Col xs={6}>
        <KeyValue label={<FormattedMessage id="ui-orders.renewals.renewalDate" />}>
          <FormattedDate value={renewal.renewalDate} />
        </KeyValue>
      </Col>
      <Col xs={6}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.renewals.reviewPeriod" />}
          value={renewal.reviewPeriod}
        />
      </Col>
      <Col xs={6}>
        <KeyValue label={<FormattedMessage id="ui-orders.renewals.manualRenewal" />}>
          <Checkbox
            checked={renewal.manualRenewal}
            disabled
          />
        </KeyValue>
      </Col>
    </Row>
  );
};

RenewalsView.propTypes = {
  order: PropTypes.object.isRequired,
};

export default RenewalsView;
