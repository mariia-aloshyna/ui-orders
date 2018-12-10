import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';

import { Required } from '../../Utils/Validate';
import {
  ERESOURCE,
  PHYSICAL,
  PE_MIX,
  OTHER,
} from '../const';

const ORDER_FORMAT = {
  electronicResource: ERESOURCE,
  physicalResource: PHYSICAL,
  PEMix: PE_MIX,
  other: OTHER,
};

class FieldOrderFormat extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  onChangeSelect = () => {
    const { dispatch, change } = this.props;

    dispatch(change('cost.quantity_physical', ''));
    dispatch(change('cost.quantity_electronic', ''));
  }

  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.orderFormat" />}
        name="order_format"
        validate={[Required]}
        onChange={this.onChangeSelect()}
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
