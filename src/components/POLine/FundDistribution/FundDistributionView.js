import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import toString from 'lodash/toString';
import get from 'lodash/get';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

class FundDistributionView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      fund_distribution: PropTypes.arrayOf(PropTypes.object)
    })
  }

  render() {
    const { initialValues } = this.props;
    const ids = toString(initialValues.fund_distribution.map(val => val.id));
    const codes = toString(initialValues.fund_distribution.map(val => val.code));
    const percentes = toString(initialValues.fund_distribution.map(val => `${val.percentage}%`));
    const encumbrances = toString(initialValues.fund_distribution.map(val => val.encumbrance));
    const estimatedPrice = get(initialValues, ['cost', 'po_line_estimated_price']);
    const amount = toString(initialValues.fund_distribution.map(val => ((val.percentage / 100) * estimatedPrice)));

    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.fundDistribution.id" />}
            value={ids}
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
            label={<FormattedMessage id="ui-orders.fundDistribution.encumbrance" />}
            value={encumbrances}
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
