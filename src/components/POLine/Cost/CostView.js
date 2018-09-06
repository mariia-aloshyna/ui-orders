import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes-components';

class CostView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="List Unit Price" value={_.get(initialValues, 'list_price')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Currency" value={_.get(initialValues, 'currency')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Quantity Ordered" value={_.get(initialValues, 'quantity')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Estimated Price" value={_.get(initialValues, 'estimated_price')} />
        </Col>
      </Row>
    );
  }
}

export default CostView;
