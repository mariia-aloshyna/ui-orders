import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';
// import FormatDate from '../../Utils/FormatDate';
// import css from './SummaryView.css';

class SummaryView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  static getDerivedStateFromProps(props, state) {
    const { initialValues, parentResources } = props;
    // Label Lookup
    function labelLookup(id, res, stateName) {
      const resObj = (parentResources[res] || {}).records || [];
      const item = _.find(resObj, { id });
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
    this.state = {};
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Total Items" value={_.get(initialValues, 'total_items')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Total Estimated Price" value={_.get(initialValues, 'total_estimated_price')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Workflow Status" value={this.state.poWorkflowStatus_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Approved" value={_.get(initialValues, 'approved')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Order Type" value={_.get(initialValues, 'order_type')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Re Encumber" value={_.get(initialValues, 're_encumber')} />
        </Col>
        <Col xs={12}>
          <div>Adjustment</div>
        </Col>
        <Col xs={3}>
          <KeyValue label="Credit" value={_.get(initialValues.credit, 'credit')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Discount" value={_.get(initialValues.discount, 'discount')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Insurance" value={_.get(initialValues.insurance, 'insurance')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Overhead" value={_.get(initialValues.overhead, 'overhead')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Shipment" value={_.get(initialValues.shipment, 'shipment')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Tax 1" value={_.get(initialValues.tax_1, 'tax_1')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Tax 2" value={_.get(initialValues.tax_2, 'tax_2')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Use Pro Rate" value={_.get(initialValues.use_pro_rate, 'use_pro_rate ')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Notes" value={_.toString(_.get(initialValues, 'notes'))} />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
