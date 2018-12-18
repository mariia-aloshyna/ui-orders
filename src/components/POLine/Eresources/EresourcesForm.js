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
  Select,
} from '@folio/stripes/components';

import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../Utils/const';
import { Required } from '../../Utils/Validate';
import css from './EresourcesForm.css';

class EresourcesForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    change: PropTypes.func,
    parentResources: PropTypes.shape({
      vendors: PropTypes.object,
    }),
    order: PropTypes.object,
  }

  providerChanged = (vendorId) => {
    const { dispatch, change, parentResources } = this.props;
    const vendors = get(parentResources, 'vendors.records', []);
    const vendor = vendors.find(v => v.id === vendorId);

    if (vendor && vendor.expected_activation_interval) {
      dispatch(change('eresource.activation_due', vendor.expected_activation_interval));
    }
  }

  render() {
    const { parentResources, order } = this.props;
    const created = get(order, 'created', '');
    const vendors = get(parentResources, 'vendors.records', []);
    const vendorOptions = vendors.map((v) => ({
      label: v.name,
      value: v.id,
    }));

    return (
      <Row>
        <Col xs={6} md={3}>
          <FormattedMessage id="ui-orders.dropdown.select">
            {(placeholder) => (
              <Field
                component={Select}
                dataOptions={vendorOptions}
                fullWidth
                label={<FormattedMessage id="ui-orders.eresource.accessProvider" />}
                placeholder={placeholder}
                onChange={(event, newValue) => this.providerChanged(newValue)}
                name="eresource.access_provider"
                validate={[Required]}
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
            name="eresource.activation_due"
            timeZone={TIMEZONE}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.createItem" />}
            name="eresource.create_inventory"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            className={css.checkboxValignCenter}
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.trial" />}
            name="eresource.trial"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            backendDateStandard={DATE_FORMAT}
            component={Datepicker}
            dateFormat={DATE_FORMAT}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.expectedActivation" />}
            name="eresource.expected_activation"
            timeZone={TIMEZONE}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.eresource.userLimit" />}
            name="eresource.user_limit"
            type="number"
          />
        </Col>
      </Row>
    );
  }
}

export default EresourcesForm;
