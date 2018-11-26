import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  FormattedMessage,
} from 'react-intl';
import {
  Checkbox,
  Col,
  KeyValue,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import FieldPaymentStatus from './FieldPaymentStatus';
import FieldReceiptStatus from './FieldReceiptStatus';
import FieldWorkflowStatus from './FieldWorkflowStatus';
import FieldOrderFormat from './FieldOrderFormat';
import FieldAcquisitionMethod from './FieldAcquisitionMethod';

class POLineDetailsForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  render() {
    const { initialValues: poLine } = this.props;

    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              id="po_line_number"
              label={<FormattedMessage id="ui-orders.poLine.poLineNumber" />}
              name="po_line_number"
              type="text"
            />
          </Col>
          <Col xs={6}>
            <FieldAcquisitionMethod />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              id="owner"
              label={<FormattedMessage id="ui-orders.poLine.owner" />}
              name="owner"
            />
          </Col>
          <Col xs={6}>
            <FieldOrderFormat />
          </Col>
          <Col xs={6}>
            <FieldWorkflowStatus />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.createdOn" />}
              value={poLine.created}
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              id="receipt_date"
              label={<FormattedMessage id="ui-orders.poLine.receiptDate" />}
              name="receipt_date"
              type="date"
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.source" />}
              value={poLine.source.description}
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              id="donor"
              label={<FormattedMessage id="ui-orders.poLine.donor" />}
              name="donor"
              type="text"
            />
          </Col>
          <Col xs={6}>
            <FieldPaymentStatus />
          </Col>
          <Col xs={6}>
            <FieldReceiptStatus />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              id="selector"
              label={<FormattedMessage id="ui-orders.poLine.selector" />}
              name="selector"
              type="text"
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              id="requester"
              label={<FormattedMessage id="ui-orders.poLine.requester" />}
              name="requester"
              type="text"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              id="cancellation_restriction"
              label={<FormattedMessage id="ui-orders.poLine.cancellationRestriction" />}
              name="cancellation_restriction"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              id="rush"
              label={<FormattedMessage id="ui-orders.poLine.rush" />}
              name="rush"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              id="collection"
              label={<FormattedMessage id="ui-orders.poLine.сollection" />}
              name="collection"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              id="checkin_items"
              label={<FormattedMessage id="ui-orders.poLine.checkinItems" />}
              name="checkin_items"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={TextArea}
              fullWidth
              id="cancellation_restriction_note"
              label={<FormattedMessage id="ui-orders.poLine.cancellationRestrictionNote" />}
              name="cancellation_restriction_note"
            />
          </Col>
          <Col xs={12}>
            <Field
              component={TextArea}
              fullWidth
              id="po_line_description"
              label={<FormattedMessage id="ui-orders.poLine.poLineDescription" />}
              name="po_line_description"
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default POLineDetailsForm;
