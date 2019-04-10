import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Select } from '@folio/stripes/components';

import normalizeEmptySelect from '../../Utils/normalizeEmptySelect';
import { requiredMaterialType } from '../../Utils/Validate';

const MaterialTypeField = ({ name, materialTypes }) => (
  <Field
    component={Select}
    dataOptions={[{ label: '', value: '' }, ...materialTypes]}
    fullWidth
    label={<FormattedMessage id="ui-orders.poLine.materialType" />}
    name={name}
    normalize={normalizeEmptySelect}
    validate={[requiredMaterialType]}
  />
);

MaterialTypeField.propTypes = {
  materialTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  name: PropTypes.string.isRequired,
};

export default MaterialTypeField;
