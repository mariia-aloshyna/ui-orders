import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Select } from '@folio/stripes/components';

import { EMPTY_OPTION } from '../../Utils/const';
import normalizeEmptySelect from '../../Utils/normalizeEmptySelect';
import { requiredMaterialType } from '../../Utils/Validate';

const MaterialTypeField = ({ name, materialTypes, disabled }) => (
  <Field
    component={Select}
    dataOptions={[EMPTY_OPTION, ...materialTypes]}
    fullWidth
    label={<FormattedMessage id="ui-orders.poLine.materialType" />}
    name={name}
    normalize={normalizeEmptySelect}
    validate={[requiredMaterialType]}
    disabled={disabled}
  />
);

MaterialTypeField.propTypes = {
  materialTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default MaterialTypeField;
