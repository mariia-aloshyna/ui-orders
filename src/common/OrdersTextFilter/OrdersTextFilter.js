import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  FilterAccordionHeader,
  TextField,
} from '@folio/stripes/components';

import {
  createClearFilterHandler,
} from '../utils';

const OrdersTextFilter = ({
  id,
  activeFilters = [],
  closedByDefault = true,
  labelId,
  name,
  type,
  onChange,
}) => {
  const clearFilter = createClearFilterHandler(onChange, name);
  const changeFilter = (e) => {
    const value = e.target.value;

    return value
      ? onChange({ name, values: [value] })
      : clearFilter();
  };

  return (
    <Accordion
      id={id}
      closedByDefault={closedByDefault}
      displayClearButton={activeFilters.length > 0}
      header={FilterAccordionHeader}
      label={<FormattedMessage id={labelId} />}
      onClearFilter={clearFilter}
    >
      <TextField
        type={type}
        value={activeFilters[0] || ''}
        onChange={changeFilter}
      />
    </Accordion>
  );
};

OrdersTextFilter.propTypes = {
  id: PropTypes.string,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  closedByDefault: PropTypes.bool,
  labelId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

OrdersTextFilter.defaultProps = {
  type: 'text',
};

export default OrdersTextFilter;
