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
        <Col xs={3}>
          <KeyValue label="Vendor Ref Number" value={_.get(initialValues, 'ref_number')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Vendor Ref Type" value={_.get(initialValues, 'ref_no_type')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Instructions to Vendor" value={_.get(initialValues, 'instructions')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Vendor Account" value={_.get(initialValues, 'vendor_account')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Note from vendor" value={_.get(initialValues, 'note_from_vendor')} />
        </Col>
      </Row>
    );
  }
}

export default VendorView;
