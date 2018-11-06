import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';

class VendorView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue label="Vendor Ref Number" value={_.get(initialValues, ['vendor_detail', 'ref_number'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Vendor Ref Type" value={_.get(initialValues, ['vendor_detail', 'ref_number_type'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Instructions To Vendor" value={_.get(initialValues, ['vendor_detail', 'instructions'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Vendor Account" value={_.get(initialValues, ['vendor_detail', 'vendor_account'])} />
          <KeyValue label="Note From Vendor" value={_.get(initialValues, ['vendor_detail', 'note_from_vendor'])} />
        </Col>
      </Row>
    );
  }
}

export default VendorView;
