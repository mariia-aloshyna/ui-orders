import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import {
  ITEM_STATUS,
  SELECT_ITEM_STATUSES,
} from '../../common/constants';
import css from './SelectItemStatus.css';

const SelectItemStatus = ({ ...rest }) => (
  <div className={css.fieldWrapper}>
    <Select
      fullWidth
      selectClass={css.itemStatusField}
      {...rest}
    >
      {SELECT_ITEM_STATUSES.map((key) => (
        <FormattedMessage
          id={`ui-orders.receiving.itemStatus.${key}`}
          key={key}
        >
          {(message) => <option value={ITEM_STATUS[key]}>{message}</option>}
        </FormattedMessage>
      ))}
    </Select>
  </div>
);

SelectItemStatus.propTypes = {
  rest: PropTypes.object,
};

export default SelectItemStatus;
