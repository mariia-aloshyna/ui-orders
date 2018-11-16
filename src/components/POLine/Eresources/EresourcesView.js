import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import toString from 'lodash/toString';
import { KeyValue, Row, Col, Checkbox } from '@folio/stripes/components';
import FormatDate from '../../Utils/FormatDate';

class EresourcesView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const eresource = this.props.initialValues.eresource;

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
          <KeyValue label="Expected Activation" value={FormatDate(toString(get(eresource, 'expected_activation')))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="User Limit" value={get(eresource, 'user_limit')} />
        </Col>
      </Row>
    );
  }
}

export default EresourcesView;
