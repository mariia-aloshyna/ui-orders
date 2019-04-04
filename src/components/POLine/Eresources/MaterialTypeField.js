import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Select } from '@folio/stripes/components';

import normalize from '../../Utils/normalize';
import { requiredMaterialType } from '../../Utils/Validate';

const MaterialTypeField = ({ name, materialTypes }) => (
  <FormattedMessage id="ui-orders.dropdown.select">
    {(placeholder) => (
      <Field
        component={Select}
        dataOptions={[{ label: placeholder, value: '' }, ...materialTypes]}
        fullWidth
        label={<FormattedMessage id="ui-orders.poLine.materialType" />}
        name={name}
        normalize={normalize}
        validate={[requiredMaterialType]}
      />
    )}
  </FormattedMessage>
);

MaterialTypeField.propTypes = {
  materialTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  name: PropTypes.string.isRequired,
};

export default MaterialTypeField;
