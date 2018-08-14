import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Datepicker, KeyValue, Row, Col } from '@folio/stripes-components/';
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
          <KeyValue label="Total Items" value={_.get(initialValues, 'total_items')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Adjustments" value={_.get(initialValues, 'adjustments')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Total Estimated Price" value={_.get(initialValues, 'total_estimated_price')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Transmission Date" value={_.get(initialValues, 'transmission_date')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Transmission Method" value={_.get(initialValues, 'transmission_method')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Workflow Status" value={_.get(initialValues, 'po_workflow_status_id')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="PO Receipt Status" value={_.get(initialValues, 'po_receipt_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="PO Payment Status" value={_.get(initialValues, 'po_payment_status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Comments" value={_.get(initialValues, 'comments')} />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
