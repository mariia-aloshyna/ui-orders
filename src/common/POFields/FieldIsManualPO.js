import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { Checkbox } from '@folio/stripes/components';

const FieldIsManualPO = ({ disabled }) => {
  return (
    <Field
      component={Checkbox}
      fullWidth
      label={<FormattedMessage id="ui-orders.orderDetails.manualPO" />}
      name="manualPo"
      type="checkbox"
      disabled={disabled}
      vertical
    />
  );
};

FieldIsManualPO.propTypes = {
  disabled: PropTypes.bool,
};

FieldIsManualPO.defaultProps = {
  disabled: false,
};

export default FieldIsManualPO;
