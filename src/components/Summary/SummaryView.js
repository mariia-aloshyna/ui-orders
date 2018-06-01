import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import css from './SummaryView.css';

class SummaryView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Approval Status" value={_.get(initialValues, 'approval_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Receipt Status" value={_.get(initialValues, 'receipt_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Payment Status" value={_.get(initialValues, 'payment_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Sent" value={_.get(initialValues, 'sent')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Comments" value={_.get(initialValues, 'comments')} />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
