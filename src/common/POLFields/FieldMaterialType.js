import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Select } from '@folio/stripes/components';

import { EMPTY_OPTION } from '../../components/Utils/const';
import normalizeEmptySelect from '../../components/Utils/normalizeEmptySelect';
import { requiredMaterialType } from '../../components/Utils/Validate';

const FieldMaterialType = ({ name, materialTypes, disabled }) => (
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

FieldMaterialType.propTypes = {
  materialTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default FieldMaterialType;