import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

const ACQUISITION_METHOD = {
  approvalPlan: 'Approval Plan',
  dda: 'Demand Driven Acquisitions (DDA)',
  depository: 'Depository',
  eba: 'Evidence Based Acquisitions (EBA)',
  exchange: 'Exchange',
  gift: 'Gift',
  purchaseAtVendorSystem: 'Purchase At Vendor System',
  purchase: 'Purchase',
  technical: 'Technical',
};

class FieldAcquisitionMethod extends Component {
  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.acquisitionMethod" />}
        name="acquisition_method"
        required
        validate={[Required]}
      >
        <FormattedMessage id="ui-orders.dropdown.select">
          {(message) => <option value="">{message}</option>}
        </FormattedMessage>
        {Object.keys(ACQUISITION_METHOD).map((key) => (
          <FormattedMessage
            id={`ui-orders.acquisition_method.${key}`}
            key={key}
          >
            {(message) => <option value={ACQUISITION_METHOD[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

export default FieldAcquisitionMethod;
