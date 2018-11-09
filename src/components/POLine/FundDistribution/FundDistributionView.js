import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';

class FundDistributionView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      fund_distribution: PropTypes.arrayOf(PropTypes.object)
    })
  }

  render() {
    const { initialValues } = this.props;
    const ids = _.toString(initialValues.fund_distribution.map(val => val.id));
    const codes = _.toString(initialValues.fund_distribution.map(val => val.code));
    const percentes = _.toString(initialValues.fund_distribution.map(val => `${val.percentage}%`));
    const encumbrances = _.toString(initialValues.fund_distribution.map(val => val.encumbrance));
    const estimatedPrice = _.get(initialValues, ['cost', 'po_line_estimated_price']);
    const amount = _.toString(initialValues.fund_distribution.map(val => ((val.percentage / 100) * estimatedPrice)));

    return (
      <Row>
        <Col xs={6}>
          <KeyValue label="Fund ID" value={ids} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Percent" value={percentes} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Code" value={codes} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Encumbrance" value={encumbrances} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Amount" value={amount} />
        </Col>
      </Row>
    );
  }
}

export default FundDistributionView;
