import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import {
  Checkbox,
  KeyValue,
  Modal,
  MultiColumnList,
  Select,
  TextField,
} from '@folio/stripes/components';

import ItemDetailsFooter from './ItemDetailsFooter';
import css from './ItemDetails.css';

const ITEM_STATUS = {
  received: 'Received',
};

class ItemDetails extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    linesItemList: PropTypes.arrayOf(PropTypes.object).isRequired,
    locationsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      allChecked: false,
      checkedItems: [],
    };
  }

  isItemChecked = (item) => (
    !!this.state.checkedItems.filter(el => el.id === item.id).length
  );

  toggleAll = () => {
    this.setState((state, props) => {
      const allChecked = !state.allChecked;
      const checkedItems = allChecked ? props.linesItemList : [];

      return {
        allChecked,
        checkedItems,
      };
    });
  }

  toggleItem = (item) => {
    this.setState(({ checkedItems }) => {
      const checkedItemList = checkedItems.filter(el => el.id !== item.id);

      return {
        allChecked: false,
        checkedItems: this.isItemChecked(item) ? [...checkedItemList] : [...checkedItems, item],
      };
    });
  }

  render() {
    const { close, linesItemList, locationsOptions } = this.props;
    const poLineNumber = get(linesItemList, [0, 'poLineNumber'], '');
    const title = get(linesItemList, [0, 'title'], '');
    const resultsFormatter = {
      'isChecked': (item) => (
        <Checkbox
          type="checkbox"
          onChange={() => this.toggleItem(item)}
          checked={this.isItemChecked(item)}
        />
      ),
      'barcode': () => (
        <div className={css.editableFieldWrapper}>
          <TextField type="number" />
        </div>
      ),
      'format': (item) => <KeyValue value={get(item, 'orderFormat', '')} />,
      'location': () => (
        <div className={css.editableFieldWrapper}>
          <Select
            dataOptions={locationsOptions}
            defaultValue=""
            fullWidth
            placeholder=" "
          />
        </div>
      ),
      'itemStatus': () => (
        <div className={css.editableFieldWrapper}>
          <Select
            defaultValue={<FormattedMessage id="ui-orders.receiving.itemStatus.received" />}
            fullWidth
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
      <Modal
        label={<FormattedMessage id="ui-orders.receiving.modalPaneTitle" values={{ poLineNumber, title }} />}
        footer={<ItemDetailsFooter close={close} />}
        open
      >
        <MultiColumnList
          contentData={linesItemList}
          formatter={resultsFormatter}
          visibleColumns={['isChecked', 'barcode', 'format', 'location', 'itemStatus']}
          columnMapping={{
            isChecked: <Checkbox type="checkbox" checked={this.state.allChecked} onChange={this.toggleAll} />,
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
      </Modal>
    );
  }
}

export default ItemDetails;
