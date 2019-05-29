import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { toString } from 'lodash';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import FundId from './FundId';

function FundDistributionView({ line = {}, funds = [] }) {
  const { fundDistribution = [] } = line;
  const codes = toString(fundDistribution.map(val => val.code));
  const percentages = toString(fundDistribution.map(val => `${val.percentage}%`));
  const estimatedPrice = line.listUnitPriceElectronic || 0;
  const amount = toString(fundDistribution.map(d => ((d.percentage / 100) * estimatedPrice).toFixed(2)));

  return (
    <Row>
      <Col xs={6}>
        <FundId
          funds={funds}
          fundDistribution={fundDistribution}
        />
      </Col>
      <Col xs={6}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.fundDistribution.percent" />}
          value={percentages}
        />
      </Col>
      <Col xs={6}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.fundDistribution.code" />}
          value={codes}
        />
      </Col>
      <Col xs={6}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.fundDistribution.amount" />}
          value={amount}
        />
      </Col>
    </Row>
  );
}

FundDistributionView.propTypes = {
  line: PropTypes.shape({
    fundDistribution: PropTypes.arrayOf(PropTypes.object).isRequired,
    cost: PropTypes.object.isRequired,
  }),
  funds: PropTypes.arrayOf(PropTypes.object),
};

export default FundDistributionView;
