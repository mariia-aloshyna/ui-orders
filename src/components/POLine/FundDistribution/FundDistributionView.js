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
    initialValues: PropTypes.shape({
      fund_distribution: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
    parentResources: PropTypes.shape({
      fund: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object).isRequired,
      }),
    }),
  }

  render() {
    const { initialValues, parentResources } = this.props;
    const codes = toString(initialValues.fund_distribution.map(val => val.code));
    const percentes = toString(initialValues.fund_distribution.map(val => `${val.percentage}%`));
    const estimatedPrice = get(initialValues, ['cost', 'po_line_estimated_price']);
    const amount = toString(initialValues.fund_distribution.map(val => ((val.percentage / 100) * estimatedPrice)));

    return (
      <Row>
        <Col xs={6}>
          <FundId
            funds={parentResources.fund}
            fundId={get(initialValues, 'fund_distribution', [])}
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
