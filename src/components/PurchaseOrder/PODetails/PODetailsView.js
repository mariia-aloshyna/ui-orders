import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import FolioFormattedTime from '../../FolioFormattedTime';
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
            value={get(order, 'poNumber')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-orders.orderDetails.createdOn" />}>
            <FolioFormattedTime dateString={get(order, 'metadata.createdDate')} />
          </KeyValue>
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
          <KeyValue label={<FormattedMessage id="ui-orders.orderDetails.manualPO" />}>
            <Checkbox checked={get(order, 'manual_po')} disabled />
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-orders.orderDetails.re_encumber" />}>
            <Checkbox checked={get(order, 're_encumber')} disabled />
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.orderType" />}
            value={get(order, 'order_type')}
          />
        </Col>
        <Col xs={12}>
          {get(order, 'notes', []).map((note, index) => (
            <KeyValue
              key={index}
              label={<FormattedMessage id="ui-orders.orderDetails.note" />}
              value={note}
            />
          ))}
        </Col>
      </Row>
    );
  }
}

export default PODetailsView;
