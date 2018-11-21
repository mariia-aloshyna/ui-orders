import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, toString } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import FormatDate from '../../Utils/FormatDate';
// import css from './css/PODetailsView.css';

class PODetailsView extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  render() {
    const { order } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.vendor" />}
            value={get(order, 'vendor_name')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.createdBy" />}
            value={get(order, 'created_by_name')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.poNumber" />}
            value={get(order, 'po_number')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.createdOn" />}
            value={FormatDate(toString(get(order, 'created')))}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.assignedTo" />}
            value={get(order, 'assigned_to_user')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.billTo" />}
            value={null}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.shipTo" />}
            value={null}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.orderType" />}
            value={get(order, 'order_type')}
          />
        </Col>
      </Row>
    );
  }
}

export default PODetailsView;
