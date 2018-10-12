import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';

class AdjustmentsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Cycle" value={_.get(initialValues, 'cycle')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Review Period" value={_.get(initialValues, 'review_period')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Renewal Date" value={_.get(initialValues, 'renewal_date')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Interval" value={_.toString(_.get(initialValues, 'interval'))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Manual Renewal" value={_.get(initialValues, 'manual_renewal')} />
        </Col>
      </Row>
    );
  }
}

export default AdjustmentsView;
