import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { get } from 'lodash';
import {
  Col,
  Datepicker,
  Row,
  Select,
} from '@folio/stripes/components';
import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../Utils/const';
import VolumesForm from './VolumesForm';

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
            fullWidth
            label={<FormattedMessage id="ui-orders.physical.materialSupplier" />}
            name="physical.material_supplier"
          />
        </Col>
        <Col xs={6}>
          <Field
            backendDateStandard={DATE_FORMAT}
            component={Datepicker}
            dateFormat={DATE_FORMAT}
            fullWidth
            label={<FormattedMessage id="ui-orders.physical.receiptDue" />}
            name="physical.receipt_due"
            timeZone={TIMEZONE}
          />
        </Col>
        <Col xs={6}>
          <Field
            backendDateStandard={DATE_FORMAT}
            component={Datepicker}
            dateFormat={DATE_FORMAT}
            fullWidth
            label={<FormattedMessage id="ui-orders.physical.receiptDate" />}
            name="physical.receiptDate"
            timeZone={TIMEZONE}
          />
        </Col>
        <Col xs={6}>
          <VolumesForm />
        </Col>
      </Row>
    );
  }
}

export default PhysicalForm;
