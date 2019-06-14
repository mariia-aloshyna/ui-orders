import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { get } from 'lodash';
import moment from 'moment';

import {
  Row,
  Col,
  Datepicker,
  TextField,
  Checkbox,
  Selection,
} from '@folio/stripes/components';

import { isWorkflowStatusOpen } from '../../PurchaseOrder/util';
import InventoryRecordTypeSelectField from '../../../settings/InventoryRecordTypeSelectField';
import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../Utils/const';
import { Required } from '../../Utils/Validate';
import MaterialTypeField from './MaterialTypeField';
import css from './EresourcesForm.css';

const ACCESS_PROVIDER_TETHER_CONFIG = {
  attachment: 'middle center',
};

class EresourcesForm extends Component {
  static propTypes = {
    vendors: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    order: PropTypes.object,
    materialTypes: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
  }

  render() {
    const { vendors, materialTypes, order } = this.props;
    const created = get(order, 'metadata.createdDate', '');
    const isOpenedOrder = isWorkflowStatusOpen(order);

    return (
      <Row>
        <Col xs={6} md={3}>
          <FormattedMessage id="ui-orders.dropdown.select">
            {(placeholder) => (
              <Field
                component={Selection}
                dataOptions={vendors}
                fullWidth
                label={<FormattedMessage id="ui-orders.eresource.accessProvider" />}
                name="eresource.accessProvider"
                placeholder={placeholder}
                tether={ACCESS_PROVIDER_TETHER_CONFIG}
                required
                validate={[Required]}
                disabled={isOpenedOrder}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.activationStatus" />}
            name="eresource.activated"
            type="checkbox"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            backendDateStandard={DATE_FORMAT}
            component={Datepicker}
            dateFormat={DATE_FORMAT}
            format={(value) => {
              return Number.isInteger(value)
                ? moment.utc(created).add(value, 'days').format(DATE_FORMAT)
                : '';
            }}
            normalize={(value) => {
              return value
                ? moment.utc(value).diff(moment(created), 'days') + 1
                : undefined;
            }}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.activationDue" />}
            name="eresource.activationDue"
            timeZone={TIMEZONE}
          />
        </Col>
        <Col xs={6} md={3}>
          <InventoryRecordTypeSelectField
            label="ui-orders.eresource.createInventory"
            name="eresource.createInventory"
            disabled={isOpenedOrder}
          />
        </Col>
        <Col xs={6} md={3}>
          <MaterialTypeField
            materialTypes={materialTypes}
            name="eresource.materialType"
            disabled={isOpenedOrder}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.trial" />}
            name="eresource.trial"
            type="checkbox"
            disabled={isOpenedOrder}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            backendDateStandard={DATE_FORMAT}
            component={Datepicker}
            dateFormat={DATE_FORMAT}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.expectedActivation" />}
            name="eresource.expectedActivation"
            timeZone={TIMEZONE}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.userLimit" />}
            name="eresource.userLimit"
            type="number"
            disabled={isOpenedOrder}
          />
        </Col>
      </Row>
    );
  }
}

export default EresourcesForm;
