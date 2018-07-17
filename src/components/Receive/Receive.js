import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import Button from '@folio/stripes-components/lib/Button';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

class Receive extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    const fundDistribution = [
      {
        'amount': '',
        'percent': 0.5,
        'fund_id': 'f1ad8f9c-9131-4d0f-956c-de2171d9fa8c'
      },
      {
        'amount': '',
        'percent': 0.5,
        'fund_id': '25909263-13a1-4e0d-99e9-992b0095a792'
      }
    ];

    const resultsFormatter = {
      'Fund ID': data => _.toString(_.get(data, ['fund_id'], '')),
      'Percent': data => _.toString(_.get(data, ['percent'], '')),
      'Amount': data => _.toString(_.get(data, ['amount'], '')),
    };

    return (
      <Row center="xs">
        <Col xs={8}>
          
          <MultiColumnList
            contentData={fundDistribution}
            resultsFormatter={resultsFormatter}
            // onRowClick={this.onSelectRow}
            visibleColumns={['fund_id', 'percent', 'amount']}
          />
        </Col>
      </Row>
    );
  }
}

export default Receive;
