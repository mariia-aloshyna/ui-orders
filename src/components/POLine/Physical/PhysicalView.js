import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import toString from 'lodash/toString';
import {
  KeyValue,
  Row,
  Col
} from '@folio/stripes/components';
import FormatDate from '../../Utils/FormatDate';

class PhysicalView extends Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const physical = this.props.initialValues.physical;

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
            value={FormatDate(toString(get(physical, 'receipt_due')))}
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
