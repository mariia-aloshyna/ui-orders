import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@folio/stripes-components';
import { FormattedMessage } from 'react-intl';
import { ITEM_STATUS } from '../../common/constants';
import css from './SelectItemStatus.css';

const SelectItemStatus = ({ statuses, ...rest }) => (
  <div className={css.fieldWrapper}>
    <Select
      fullWidth
      selectClass={css.itemStatusField}
      {...rest}
    >
      {statuses.map((key) => (
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
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  rest: PropTypes.object,
};

export default SelectItemStatus;
