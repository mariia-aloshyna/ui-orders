import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import FormatDate from '../../Utils/FormatDate';
// import css from './css/PODetailsView.css';

class DetailsView extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  render() {
    const { order } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <KeyValue label="Vendor" value={_.get(order, 'vendor_name')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Created By" value={_.toString(_.get(order, 'created_by'))} />
        </Col>
        <Col xs={6}>
          <KeyValue label="PO Number" value={_.get(order, 'po_number')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Created On" value={FormatDate(_.toString(_.get(order, 'created')))} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Assigned To" value={_.get(order, 'assigned_to_user')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Bill To" value={null} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Ship To" value={null} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Order Type" value={_.get(order, 'order_type')} />
        </Col>
      </Row>
    );
  }
}

export default DetailsView;
