import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Checkbox } from '@folio/stripes/components';

const FieldActivated = () => {
  return (
    <Field
      component={Checkbox}
      fullWidth
      label={<FormattedMessage id="ui-orders.eresource.activationStatus" />}
      name="eresource.activated"
      type="checkbox"
    />
  );
};

export default FieldActivated;
