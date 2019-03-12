import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Checkbox,
  Col,
  KeyValue,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import FolioFormattedTime from '../../FolioFormattedTime';
import FieldPaymentStatus from './FieldPaymentStatus';
import FieldReceiptStatus from './FieldReceiptStatus';
import FieldOrderFormat from './FieldOrderFormat';
import FieldAcquisitionMethod from './FieldAcquisitionMethod';

class POLineDetailsForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    stripes: PropTypes.shape({
      store: PropTypes.object.isRequired,
    }).isRequired,
    order: PropTypes.object,
    parentResources: PropTypes.shape({
      vendors: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object).isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { change, dispatch, initialValues: poLine, stripes: { store }, parentResources, order } = this.props;
    const vendors = get(parentResources, 'vendors.records', []);

    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            {poLine.id && (
              <Field
                component={TextField}
                disabled
                fullWidth
                label={<FormattedMessage id="ui-orders.poLine.poLineNumber" />}
                name="poLineNumber"
                type="text"
              />
            )}
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
            <FieldOrderFormat
              change={change}
              dispatch={dispatch}
              store={store}
              vendors={vendors}
              orderVendorId={order.vendor}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.createdOn" />}>
              <FolioFormattedTime dateString={get(poLine, 'metadata.createdDate')} />
            </KeyValue>
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.poLine.receiptDate" />}
              name="receiptDate"
              type="date"
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.source" />}
              value={get(poLine, 'source.code')}
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
              label={<FormattedMessage id="ui-orders.poLine.cancellationRestriction" />}
              name="cancellationRestriction"
              type="checkbox"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              id="rush"
              label={<FormattedMessage id="ui-orders.poLine.rush" />}
              name="rush"
              type="checkbox"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              id="collection"
              label={<FormattedMessage id="ui-orders.poLine.сollection" />}
              name="collection"
              type="checkbox"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={Checkbox}
              fullWidth
              label={<FormattedMessage id="ui-orders.poLine.checkinItems" />}
              name="checkinItems"
              type="checkbox"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={TextArea}
              fullWidth
              label={<FormattedMessage id="ui-orders.poLine.cancellationRestrictionNote" />}
              name="cancellationRestrictionNote"
            />
          </Col>
          <Col xs={12}>
            <Field
              component={TextArea}
              fullWidth
              label={<FormattedMessage id="ui-orders.poLine.poLineDescription" />}
              name="poLineDescription"
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default POLineDetailsForm;
