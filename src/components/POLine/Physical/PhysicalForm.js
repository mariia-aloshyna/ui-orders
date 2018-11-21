import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import get from 'lodash/get';
import {
  Col,
  Datepicker,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

class PhysicalForm extends Component {
  render() {
    const vendors = get(this.props, 'parentResources.vendors.records', []).map((v) => ({
      label: v.name,
      value: v.name,
    }));

    return (
      <Row>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={vendors}
            id="material_supplier"
            label={<FormattedMessage id="ui-orders.physical.materialSupplier" />}
            name="physical.material_supplier"
            fullWidth
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Datepicker}
            dateFormat="YYYY-MM-DD"
            timeZone="UTC"
            id="receipt_due"
            label={<FormattedMessage id="ui-orders.physical.receiptDue" />}
            name="physical.receipt_due"
            fullWidth
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            id="volumes"
            label={<FormattedMessage id="ui-orders.physical.volumes" />}
            name="physical.volumes"
            type="number"
            fullWidth
          />
        </Col>
      </Row>
    );
  }
}

export default PhysicalForm;
