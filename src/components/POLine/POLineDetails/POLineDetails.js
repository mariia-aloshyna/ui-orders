import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  FormattedDate,
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
    const receiptDate = get(initialValues, 'receiptDate');

    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.number" />}
              value={get(initialValues, 'poLineNumber')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.acquisitionMethod" />}
              value={get(initialValues, 'acquisitionMethod')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.orderFormat" />}
              value={get(initialValues, 'orderFormat')}
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
            <KeyValue label={<FormattedMessage id="ui-orders.poLine.receiptDate" />}>
              {receiptDate && <FormattedDate value={receiptDate} />}
            </KeyValue>
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.source" />}
              value={get(initialValues, 'source.code')}
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
              value={get(initialValues, 'paymentStatus')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.receiptStatus" />}
              value={get(initialValues, 'receiptStatus')}
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
              <Checkbox checked={get(initialValues, 'cancellationRestriction')} disabled />
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
              <Checkbox checked={get(initialValues, 'checkinItems')} disabled />
            </KeyValue>
          </Col>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.cancellationRestrictionNote" />}
              value={get(initialValues, 'cancellationRestrictionNote')}
            />
          </Col>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.poLine.poLineDescription" />}
              value={get(initialValues, 'poLineDescription')}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default POLineDetails;
