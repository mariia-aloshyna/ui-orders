import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  get,
  toString,
} from 'lodash';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import FundId from './FundId';

class FundDistributionView extends Component {
  static propTypes = {
    line: PropTypes.shape({
      fundDistribution: PropTypes.arrayOf(PropTypes.object).isRequired,
      cost: PropTypes.object.isRequired,
    }),
    parentResources: PropTypes.shape({
      fund: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object).isRequired,
      }),
    }),
  }

  render() {
    const { line = {}, parentResources } = this.props;
    const { cost, fundDistribution = [] } = line;
    const codes = toString(fundDistribution.map(val => val.code));
    const percentes = toString(fundDistribution.map(val => `${val.percentage}%`));
    const quantityPhysical = get(cost, 'quantityPhysical', 0);
    const quantityElectronic = get(cost, 'quantityElectronic', 0);
    const listPrice = get(cost, 'listPrice', 0);
    const estimatedPrice = listPrice * (quantityPhysical + quantityElectronic);
    const amount = toString(fundDistribution.map(d => parseFloat((d.percentage / 100) * estimatedPrice).toFixed(2)));

    return (
      <Row>
        <Col xs={6}>
          <FundId
            funds={parentResources.fund}
            fundDistribution={fundDistribution}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.fundDistribution.percent" />}
            value={percentes}
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
}

export default FundDistributionView;
