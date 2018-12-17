import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';

function FieldSource({ sources = [] }) {
  const options = sources.map((source) => ({
    label: source.description,
    value: source.id,
  }));

  return (
    <FormattedMessage id="ui-orders.dropdown.select">
      {(placeholder) => (
        <Field
          component={Select}
          dataOptions={options}
          label={<FormattedMessage id="ui-orders.poLine.source" />}
          name="source"
          placeholder={placeholder}
          format={(source) => {
            return source
              ? {
                label: source.description,
                value: source.id,
              } : '';
          }}
          normalize={(sourceId) => sources.find(s => s.id === sourceId)}
        />
      )}
    </FormattedMessage>
  );
}

FieldSource.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export default FieldSource;
