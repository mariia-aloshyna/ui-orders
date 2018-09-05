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

  static getDerivedStateFromProps(props, state) {
    const { initialValues, parentResources } = props;
    // Label Lookup
    function labelLookup(id, res, stateName) {
      const resObj = (parentResources[res] || {}).records || [];
      const item = _.find(resObj, { id: id });
      const label = _.isEmpty(item) ? '' : item.description;
      return { [`${stateName}_id`]: id, [`${stateName}_label`]: label };
    }

    // State: workflowStatus_id, workflowStatus_label, poWorkflowStatus_id, poWorkflowStatus_label
    const poWorkflowStatusID = _.get(initialValues, 'po_workflow_status_id');
    const poReceiptStatusID = _.get(initialValues, 'po_receipt_status');
    if ((poWorkflowStatusID !== state.poWorkflowStatus_id) && (poReceiptStatusID !== state.poReceiptStatus_id)) {
      const poWorkflowStatus = labelLookup(poWorkflowStatusID, 'workflowStatus', 'poWorkflowStatus') || {};
      const poReceiptStatus = labelLookup(poReceiptStatusID, 'receiptStatus', 'poReceiptStatus') || {};
      const newState = Object.assign({}, poWorkflowStatus, poReceiptStatus);
      return newState;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      poWorkflowStatus_id: null,
      poReceiptStatus_id: null
    };
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
          <KeyValue label="Workflow Status" value={this.state.poWorkflowStatus_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="PO Receipt Status" value={this.state.poReceiptStatus_label} />
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
