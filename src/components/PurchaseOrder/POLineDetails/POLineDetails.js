import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Pane from '@folio/stripes-components/lib/Pane';
import queryString from 'query-string';
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import css from './POLineDetails.css';

class LineDetailsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Po Line ID" value={_.get(initialValues, 'po_line_id')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Acquisition Method" value={_.get(initialValues, 'acquisition_method')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Owner" value={_.get(initialValues, 'owner')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Order Format" value={_.get(initialValues, 'format')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Status" value={_.get(initialValues, 'status')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Order Type" value={_.get(initialValues, 'type')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Created on" value={_.get(initialValues, 'recorded')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Receipt Date" value={_.get(initialValues, 'receipt_date')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Source" value={_.get(initialValues, 'source')} />
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
          <KeyValue label="Rush" value={_.get(initialValues, 'rush')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Manual Batching" value={_.get(initialValues, 'manual_batching')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Collection" value={_.get(initialValues, 'collection')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Cancellation Description" value={_.get(initialValues, 'cancellation_description')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Line Description" value={_.get(initialValues, 'line_description')} />
        </Col>
      </Row>
    );
  }
}

export default LineDetailsView;
