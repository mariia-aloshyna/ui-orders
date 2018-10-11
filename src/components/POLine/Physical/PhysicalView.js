import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';

class PhysicalView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Expected Receipt Date" value={_.get(initialValues, 'expected_receipt_date')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Receipt Note" value={_.get(initialValues, 'receipt_due')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Expected Receipt Interval" value={_.get(initialValues, 'expected_receipt_interval')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Volumes" value={_.toString(_.get(initialValues, 'volumes'))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Material ID" value={_.get(initialValues, 'material_id')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Material Supplier" value={_.get(initialValues, 'material_supplier')} />
        </Col>
      </Row>
    );
  }
}

export default PhysicalView;
