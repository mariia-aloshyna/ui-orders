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
    vendorDetail: PropTypes.object
  }

  render() {
    const { vendorDetail } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.refNumber" />}
            value={get(vendorDetail, 'ref_number')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.refNumberType" />}
            value={get(vendorDetail, 'ref_number_type')}
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
            label={<FormattedMessage id="ui-orders.vendor.vendorAccount" />}
            value={get(vendorDetail, 'vendor_account')}
          />
          <KeyValue
            label={<FormattedMessage id="ui-orders.vendor.noteFromVendor" />}
            value={get(vendorDetail, 'note_from_vendor')}
          />
        </Col>
      </Row>
    );
  }
}

export default VendorView;
