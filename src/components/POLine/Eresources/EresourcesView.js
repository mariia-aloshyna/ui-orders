import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';

class EresourcesView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Access Provider" value={_.get(initialValues, 'access_provider')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Activation Status" value={_.get(initialValues, 'activation_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Activation Due" value={_.get(initialValues, 'activation_due')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Create Inventory" value={_.get(initialValues, 'create_inventory')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Trial" value={_.get(initialValues, 'trial')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Expected Activation" value={_.get(initialValues, 'expected_activation')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="User Limit" value={_.get(initialValues, 'user_limit')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Material ID" value={_.get(initialValues, 'material_id')} />
        </Col>
      </Row>
    );
  }
}

export default EresourcesView;
