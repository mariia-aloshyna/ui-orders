import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  FormattedDate,
  FormattedMessage,
} from 'react-intl';
import moment from 'moment';

import {
  Checkbox,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

export default function EresourcesView({ line: { eresource }, order, vendors }) {
  const expectedActivation = get(eresource, 'expected_activation');
  const activationDue = get(eresource, 'activation_due');
  const created = get(order, 'metadata.createdDate', '');
  const activationDueDate = activationDue && moment.utc(created).add(activationDue, 'days').format();
  const accessProviderId = get(eresource, 'access_provider');
  const accessProvider = vendors.find((v => v.id === accessProviderId));

  return (
    <Row>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.eresource.accessProvider" />}
          value={get(accessProvider, 'name', '')}
        />
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-orders.eresource.activationStatus" />}>
          <Checkbox checked={get(eresource, 'activated')} disabled />
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-orders.eresource.activationDue" />}>
          {activationDueDate && <FormattedDate value={activationDueDate} />}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-orders.eresource.createItem" />}>
          <Checkbox checked={get(eresource, 'create_inventory')} disabled />
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-orders.eresource.trial" />}>
          <Checkbox checked={get(eresource, 'trial')} disabled />
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id="ui-orders.eresource.expectedActivation" />}>
          {expectedActivation && <FormattedDate value={expectedActivation} />}
        </KeyValue>
      </Col>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-orders.eresource.userLimit" />}
          value={get(eresource, 'user_limit')}
        />
      </Col>
    </Row>
  );
}

EresourcesView.propTypes = {
  line: PropTypes.shape({
    eresource: PropTypes.object,
  }).isRequired,
  order: PropTypes.object.isRequired,
  vendors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};
