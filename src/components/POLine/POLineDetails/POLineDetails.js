import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import FolioFormattedTime from '../../FolioFormattedTime';

class POLineDetails extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.poLineNumber" />}
              value={get(initialValues, 'po_line_number')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.acquisitionMethod" />}
              value={get(initialValues, 'acquisition_method')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.owner" />}
              value={get(initialValues, 'owner')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.orderFormat" />}
              value={get(initialValues, 'order_format')}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.createdOn" />}>
              <FolioFormattedTime dateString={get(initialValues, 'metadata.createdDate')} />
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.receiptDate" />}
              value={get(initialValues, 'receipt_date')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.source" />}
              value={get(initialValues, 'source.description')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.donor" />}
              value={get(initialValues, 'donor')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.paymentStatus" />}
              value={get(initialValues, 'payment_status')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.receiptStatus" />}
              value={get(initialValues, 'receipt_status')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.selector" />}
              value={get(initialValues, 'selector')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.requester" />}
              value={get(initialValues, 'requester')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.cancellationRestriction" />}>
              <Checkbox checked={get(initialValues, 'cancellation_restriction')} disabled />
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.rush" />}>
              <Checkbox checked={get(initialValues, 'rush')} disabled />
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.сollection" />}>
              <Checkbox checked={get(initialValues, 'collection')} disabled />
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.checkinItems" />}>
              <Checkbox checked={get(initialValues, 'checkin_items')} disabled />
            </KeyValue>
          </Col>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.cancellationRestrictionNote" />}
              value={get(initialValues, 'cancellation_restriction_note')}
            />
          </Col>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.poLineDescription" />}
              value={get(initialValues, 'po_line_description')}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default POLineDetails;
