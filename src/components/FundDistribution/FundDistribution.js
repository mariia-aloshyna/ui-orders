import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import Button from '@folio/stripes-components/lib/Button';

class LicenseView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { openReceiveItem } = this.props;
    const clr = '#616161';

    return (
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={12}>
              <h6 style={{ 'fontSize': '1rem', 'color': clr }} >Fund Distribution</h6>
            </Col>
            <Col xs={3}>
              <Button buttonStyle="default" style={{ width: '100%' }}>History %</Button>
            </Col>
            <Col xs={3}>
              <Button buttonStyle="default" style={{ width: '100%' }}>Engineering %</Button>
            </Col>
            <Col xs={3}>
              <Button buttonStyle="default" style={{ width: '100%' }}>Fine Arts %</Button>
            </Col>
            <Col xs={3}>
              <Button buttonStyle="default" style={{ width: '100%' }}>Business %</Button>
            </Col>
            <Col xs={12}><hr /></Col>
          </Row>
          <Row center="xs">
            <Col xs={3}>
              <h2 style={{ 'padding': '2px', 'margin': '0', 'color': clr }}>$00.0</h2>
              <p style={{ 'padding': '2px', 'margin': '0', 'color': clr }}>Total Price</p>
            </Col>
            <Col xs={12}><hr /></Col>
          </Row>
          <Row center="xs">
            <Col xs={12}>
              <Button buttonStyle="primary">Checkin</Button>
              <Button buttonStyle="primary" onClick={openReceiveItem}>Receive</Button>
              <Button buttonStyle="primary">Order</Button>
              <Button buttonStyle="primary">Save Order</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default LicenseView;
