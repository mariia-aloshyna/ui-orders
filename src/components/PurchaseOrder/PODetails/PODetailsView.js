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
            value={get(order, 'vendorName')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.createdBy" />}
            value={get(order, 'createdByName')}
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
            value={get(order, 'assignedToUser')}
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
            <Checkbox checked={get(order, 'manualPo')} disabled />
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-orders.orderDetails.re_encumber" />}>
            <Checkbox checked={get(order, 'reEncumber')} disabled />
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.orderDetails.orderType" />}
            value={get(order, 'orderType')}
          />
        </Col>
        <Col
          data-test-order-details-owner
          xs={6}
        >
          <KeyValue
            label={<FormattedMessage id="ui-orders.poLine.owner" />}
            value={get(order, 'owner')}
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
