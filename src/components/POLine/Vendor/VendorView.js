import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

class VendorView extends Component {
  static propTypes = {
    vendorDetail: PropTypes.object,
  };

  render() {
    const { vendorDetail } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.refNumber" />}
            value={get(vendorDetail, 'refNumber')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.refNumberType" />}
            value={get(vendorDetail, 'refNumberType')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.instructions" />}
            value={get(vendorDetail, 'instructions')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.accountNumber" />}
            value={get(vendorDetail, 'vendorAccount')}
          />
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.noteFromVendor" />}
            value={get(vendorDetail, 'noteFromVendor')}
          />
        </Col>
      </Row>
    );
  }
}

export default VendorView;
