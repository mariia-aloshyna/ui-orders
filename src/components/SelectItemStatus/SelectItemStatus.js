import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Select } from '@folio/stripes/components';

import {
  STATUS_IN_PROCESS,
} from '../../common/constants';

import css from './SelectItemStatus.css';

// eslint-disable-next-line no-unused-vars
const SelectItemStatus = ({ isAssociatedRecord, ...rest }) => {
  const availableStatuses = [STATUS_IN_PROCESS];

  return (
    <div className={css.fieldWrapper}>
      <Select
        fullWidth
        selectClass={css.itemStatusField}
        {...rest}
      >
        {availableStatuses.map((key) => (
          <FormattedMessage
            id={`ui-orders.receiving.itemStatus.${key}`}
            key={key}
          >
            {(message) => <option value={key}>{message}</option>}
          </FormattedMessage>
        ))}
      </Select>
    </div>
  );
};

SelectItemStatus.propTypes = {
  rest: PropTypes.object,
  isAssociatedRecord: PropTypes.string,
};

export default SelectItemStatus;
