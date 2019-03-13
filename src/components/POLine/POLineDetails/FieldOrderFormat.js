import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  getFormValues,
} from 'redux-form';
import { get } from 'lodash';

import { Select } from '@folio/stripes/components';

import { Required } from '../../Utils/Validate';
import {
  ERESOURCE,
  ERESOURCES,
  OTHER,
  PE_MIX,
  PHYSICAL,
} from '../const';

const ORDER_FORMAT = {
  electronicResource: ERESOURCE,
  physicalResource: PHYSICAL,
  PEMix: PE_MIX,
  other: OTHER,
};

class FieldOrderFormat extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    orderVendorId: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
    vendors: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  onChangeSelect = (value) => {
    const { dispatch, change, store, vendors, orderVendorId } = this.props;

    dispatch(change('cost.quantityPhysical', ''));
    dispatch(change('cost.quantityElectronic', ''));

    if (ERESOURCES.includes(value)) {
      const formValues = getFormValues('POLineForm')(store.getState());
      const activationDue = get(formValues, 'eresource.activationDue');
      const vendor = vendors.find(v => v.id === orderVendorId);

      if (activationDue === undefined && vendor && vendor.expected_activation_interval) {
        dispatch(change('eresource.activationDue', vendor.expected_activation_interval));
      }
    }
  }

  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.orderFormat" />}
        name="orderFormat"
        onChange={e => this.onChangeSelect(e.target.value)}
        required
        validate={[Required]}
      >
        <FormattedMessage id="ui-orders.dropdown.select">
          {(message) => <option value="">{message}</option>}
        </FormattedMessage>
        {Object.keys(ORDER_FORMAT).map((key) => (
          <FormattedMessage
            id={`ui-orders.order_format.${key}`}
            key={key}
          >
            {(message) => <option value={ORDER_FORMAT[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

export default FieldOrderFormat;
