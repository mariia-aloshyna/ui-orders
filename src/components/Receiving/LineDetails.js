import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  Checkbox,
  KeyValue,
  MultiColumnList,
  TextField,
  Select,
} from '@folio/stripes/components';

import { ITEM_STATUS } from './const';

import css from './ItemDetails.css';

const LineDetails = ({
  allChecked,
  isItemChecked,
  isLoading,
  itemsMap,
  lineItems,
  locationsOptions,
  onChangeField,
  poLineId,
  toggleAll,
  toggleItem,
}) => {
  const resultFormatter = {
    'isChecked': (item) => (
      <Checkbox
        checked={isItemChecked(item)}
        onChange={() => toggleItem(item)}
        type="checkbox"
      />
    ),
    'barcode': (item) => (
      <div className={css.fieldWrapper}>
        <TextField
          disabled={isLoading || itemsMap[item.itemId] === undefined}
          onChange={(e) => onChangeField(item, e.target.value, 'barcode')}
          type="text"
          value={item.barcode}
        />
      </div>
    ),
    'format': (item) => (
      <div className={css.fieldWrapper}>
        <KeyValue value={get(item, 'poLineOrderFormat', '')} />
      </div>
    ),
    'location': (item) => (
      <div className={css.fieldWrapper}>
        <Select
          dataOptions={locationsOptions}
          fullWidth
          onChange={(e) => onChangeField(item, e.target.value, 'locationId')}
          value={get(item, 'locationId', '')}
        />
      </div>
    ),
    'itemStatus': () => (
      <div className={css.fieldWrapper}>
        <Select
          fullWidth
          selectClass={css.itemStatusField}
          value={ITEM_STATUS.inProcess}
        >
          {Object.keys(ITEM_STATUS).map((key) => (
            <FormattedMessage
              id={`ui-orders.receiving.itemStatus.${key}`}
              key={key}
            >
              {(message) => <option value={ITEM_STATUS[key]}>{message}</option>}
            </FormattedMessage>
          ))}
        </Select>
      </div>
    ),
  };

  return (
    <MultiColumnList
      contentData={lineItems[poLineId]}
      formatter={resultFormatter}
      visibleColumns={['isChecked', 'barcode', 'format', 'location', 'itemStatus']}
      columnMapping={{
        isChecked: <Checkbox type="checkbox" checked={allChecked[poLineId]} onChange={() => toggleAll(poLineId)} />,
        barcode: <FormattedMessage id="ui-orders.receiving.barcode" />,
        format: <FormattedMessage id="ui-orders.receiving.format" />,
        location: <FormattedMessage id="ui-orders.receiving.location" />,
        itemStatus: <FormattedMessage id="ui-orders.receiving.itemStatus" />,
      }}
      columnWidths={{
        isChecked: '5%',
        barcode: '25%',
        format: '20%',
        location: '35%',
        itemStatus: '15%',
      }}
    />
  );
};

LineDetails.propTypes = {
  allChecked: PropTypes.object.isRequired,
  isItemChecked: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  itemsMap: PropTypes.object,
  lineItems: PropTypes.object.isRequired,
  locationsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeField: PropTypes.func.isRequired,
  poLineId: PropTypes.string.isRequired,
  toggleAll: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
};

export default LineDetails;
