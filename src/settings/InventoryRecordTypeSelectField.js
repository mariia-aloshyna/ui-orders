import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { FieldSelect } from '@folio/stripes-acq-components';
import { INVENTORY_RECORDS_TYPE_FOR_SELECT } from '../components/POLine/const';

const InventoryRecordTypeSelectField = ({ label, name, disabled, ...rest }) => (
  <FieldSelect
    dataOptions={INVENTORY_RECORDS_TYPE_FOR_SELECT}
    fullWidth
    label={<FormattedMessage id={label} />}
    name={name}
    disabled={disabled}
    {...rest}
  />
);

InventoryRecordTypeSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default InventoryRecordTypeSelectField;
