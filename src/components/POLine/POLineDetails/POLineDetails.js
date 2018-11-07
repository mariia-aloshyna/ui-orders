import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Checkbox, KeyValue, Row, Col } from '@folio/stripes/components';

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
    const statusID = _.get(initialValues, 'receipt_status');
    if ((orderID !== state.order_format_id) || (statusID !== state.status_id)) {
      const orderFormat = labelLookup(orderID, 'orderFormatDD', 'order_format') || {};
      const status = labelLookup(statusID, 'statusDD', 'status');
      const newState = Object.assign({}, orderFormat, status);
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
        <Col xs={6}>
          <KeyValue label="PO Line ID" value={_.get(initialValues, 'po_line_number')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Acquisition Method" value={_.get(initialValues, 'acquisition_method')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Owner" value={_.get(initialValues, 'owner')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Order Format" value={this.state.order_format_label} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Status" value={this.state.status_label} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Receipt Date" value={_.get(initialValues, 'receipt_date')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Donor" value={_.get(initialValues, 'donor')} />
        </Col>
        <Col xs={6} />
        <Col xs={3}>
          <KeyValue label="Cancellation Restriction">
            <Checkbox checked={_.get(initialValues, ['cancellation_restriction'])} disabled />
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label="Rush">
            <Checkbox checked={_.get(initialValues, ['rush'])} disabled />
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label="Collection">
            <Checkbox checked={_.get(initialValues, ['collection'])} disabled />
          </KeyValue>
        </Col>
        <Col xs={6}>
          <br />
          <KeyValue label="Selector" value={_.get(initialValues, 'selector')} />
        </Col>
        <Col xs={6}>
          <br />
          <KeyValue label="Requester" value={_.get(initialValues, 'requester')} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Comments" value={_.get(initialValues, 'po_line_description')} />
        </Col>
      </Row>
    );
  }
}

export default LineDetailsView;
