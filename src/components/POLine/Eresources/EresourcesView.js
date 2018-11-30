import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import formatDate from '../../Utils/formatDate';

export default function EresourcesView({ initialValues: { eresource } }) {
  return (
    <Row>
      <Col xs={3}>
        <KeyValue label="Access Provider" value={get(eresource, 'access_provider')} />
      </Col>
      <Col xs={3}>
        <KeyValue label="Activation Status">
          <Checkbox checked={get(eresource, 'activated')} disabled />
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label="Activation Due" value={get(eresource, 'activation_due')} />
      </Col>
      <Col xs={3}>
        <KeyValue label="Create Item">
          <Checkbox checked={get(eresource, 'create_inventory')} disabled />
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label="Trial">
          <Checkbox checked={get(eresource, 'trial')} disabled />
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label="Expected Activation" value={formatDate(get(eresource, 'expected_activation'))} />
      </Col>
      <Col xs={3}>
        <KeyValue label="User Limit" value={get(eresource, 'user_limit')} />
      </Col>
    </Row>
  );
}

EresourcesView.propTypes = {
  initialValues: PropTypes.shape({
    eresource: PropTypes.object,
  }).isRequired,
};
