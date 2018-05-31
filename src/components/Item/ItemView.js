import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class ItemView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Title" value={_.get(initialValues, 'title')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Receiving Note" value={_.get(initialValues, 'receiving_note')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Product ID" value={_.get(initialValues, 'product_id')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Subscription From" value={_.toString(_.get(initialValues, 'subscription_from'))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Material Type" value={_.get(initialValues, 'material_type')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Subscription Interval" value={_.get(initialValues, 'subscription_interval')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Subscription To" value={_.toString(_.get(initialValues, 'subscription_to'))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Description" value={_.get(initialValues, 'description')} />
        </Col>
      </Row>
    );
  }
}

export default ItemView;
