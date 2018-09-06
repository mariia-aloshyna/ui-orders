import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class ClaimView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Claim" value={_.get(initialValues, 'claim')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Claim Sent" value={_.get(initialValues, 'sent')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Claim Grace" value={_.get(initialValues, 'grace')} />
        </Col>
      </Row>
    );
  }
}

export default ClaimView;
