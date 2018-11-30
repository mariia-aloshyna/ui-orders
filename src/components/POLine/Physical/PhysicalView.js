import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, toString } from 'lodash';

import {
  KeyValue,
  Row,
  Col,
} from '@folio/stripes/components';
import formatDate from '../../Utils/formatDate';

class PhysicalView extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  render() {
    const { initialValues: { physical } } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.physical.materialSupplier" />}
            value={get(physical, 'material_supplier')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.physical.receiptDue" />}
            value={formatDate(get(physical, 'receipt_due'))}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.physical.receiptDate" />}
            value={formatDate(get(physical, 'receipt_date'))}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.physical.volumes" />}
            value={toString(get(physical, 'volumes'))}
          />
        </Col>
      </Row>
    );
  }
}

export default PhysicalView;
