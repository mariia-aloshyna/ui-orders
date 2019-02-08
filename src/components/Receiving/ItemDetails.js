import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import {
  Button,
  Modal,
  Row,
  Select,
  TextField,
  MultiColumnList,
} from '@folio/stripes/components';

class ItemDetails extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    itemList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { close, itemList } = this.props;
    const resultsFormatter = {
      'title': line => get(line, 'title', ''),
      'barcode': () => <TextField type="number" />,
      'location': () => <Select fullWidth />,
      'itemStatus': () => <Select fullWidth />,
    };

    return (
      <Modal
        label={<FormattedMessage id="ui-orders.receiving.modalPaneTitle" />}
        open
      >
        <Row end="xs">
          <Button
            buttonStyle="primary"
            onClick={close}
          >
            <FormattedMessage id="ui-orders.receiving.cancelBtn" />
          </Button>
          <Button
            buttonStyle="primary"
            disabled
          >
            <FormattedMessage id="ui-orders.receiving.receiveBtn" />
          </Button>
        </Row>
        <MultiColumnList
          contentData={itemList}
          formatter={resultsFormatter}
          visibleColumns={['title', 'barcode', 'location', 'itemStatus']}
          columnMapping={{
            title: <FormattedMessage id="ui-orders.receiving.title" />,
            barcode: <FormattedMessage id="ui-orders.receiving.barcode" />,
            location: <FormattedMessage id="ui-orders.receiving.location" />,
            itemStatus: <FormattedMessage id="ui-orders.receiving.itemStatus" />,
          }}
          columnWidths={{
            title: '40%',
            barcode: '20%',
            location: '20%',
            itemStatus: '20%',
          }}
        />
      </Modal>
    );
  }
}

export default ItemDetails;
