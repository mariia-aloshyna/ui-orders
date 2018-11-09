import React from 'react';
import PropTypes from 'prop-types';
import toString from 'lodash/toString';
import get from 'lodash/get';
import { KeyValue, Row, Col } from '@folio/stripes/components';

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
