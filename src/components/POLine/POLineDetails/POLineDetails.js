import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes-components/';

class LineDetailsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  static getDerivedStateFromProps(props, state) {
    const { initialValues, parentResources } = props;
    // Label Lookup
    function labelLookup(id, res, stateName) {
      const resObj = (parentResources.dropdown || {})[res] || [];
      const item = _.find(resObj, { value: id });
      const label = _.isEmpty(item) ? '' : item.label;
      return { [`${stateName}_id`]: id, [`${stateName}_label`]: label };
    }

    const orderID = _.get(initialValues, 'order_format');
    const acquisitionID = _.get(initialValues, 'acquisition_method');
    const statusID = _.get(initialValues, 'receipt_status');
    const orderTypeID = _.get(initialValues, 'order_type');
    const sourceID = _.get(initialValues, 'source');
    if ((orderID !== state.order_format_id) || (acquisitionID !== state.acquisition_id) || (statusID !== state.status_id)) {
      const orderFormat = labelLookup(orderID, 'orderFormatDD', 'order_format') || {};
      const acquisition = labelLookup(acquisitionID, 'acquisitionMethodDD', 'acquisition') || {};
      const status = labelLookup(statusID, 'statusDD', 'status');
      const orderType = labelLookup(orderTypeID, 'orderTypeDD', 'order_type');
      const source = labelLookup(sourceID, 'sourceDD', 'source');
      const newState = Object.assign({}, orderFormat, acquisition, status, orderType, source);
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
          <KeyValue label="PO Line ID" value={_.get(initialValues, 'id')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="PO Line Number" value={_.get(initialValues, 'po_line_number')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Acquisition Method" value={this.state.acquisition_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Owner" value={_.get(initialValues, 'owner')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Barcode" value={_.get(initialValues, 'barcode')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Order Format" value={this.state.order_format_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Status" value={this.state.status_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Order Type" value={this.state.order_type_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Receipt Date" value={_.get(initialValues, 'receipt_date')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Source" value={this.state.source_label} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Donor" value={_.get(initialValues, 'donor')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Selector" value={_.get(initialValues, 'selector')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Requester" value={_.get(initialValues, 'requester')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Cancellation Restriction" value={_.get(initialValues, 'cancellation_restriction')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Collection" value={_.get(initialValues, 'collection')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Cancellation Description" value={_.get(initialValues, 'cancellation_description')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="PO Line Description" value={_.get(initialValues, 'po_line_description')} />
        </Col>
      </Row>
    );
  }
}

export default LineDetailsView;
