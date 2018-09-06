import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Select, MultiColumnList, Row, Col, Button, Pane, TextField } from '@folio/stripes-components';
// import TableDropdownMenu from './TableDropdownMenu';
import css from './css/Received.css';
import imgBarcode from './img/Barcode.svg';


const fundDistribution = [
  {
    'title': 'Title',
    'barcode': '123145646',
    'location': 'Edmonton',
    'item_status': 'Received'
  },
  {
    'title': 'Title',
    'barcode': '123145646',
    'location': 'Edmonton',
    'item_status': 'Received'
  },
  {
    'title': 'Title',
    'barcode': '123145646',
    'location': 'Edmonton',
    'item_status': 'Received'
  },
  {
    'title': 'Title',
    'barcode': '123145646',
    'location': 'Edmonton',
    'item_status': 'Received'
  },
];

class Received extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  locationDD() {
    return [
      { label: '-- Select --', value: '' },
      { label: 'Edmonton', value: 'Edmonton' },
      { label: 'Calgary', value: 'Calgary' },
    ];
  }

  itemStatusDD() {
    return [
      { label: '-- Select --', value: '' },
      { label: 'Receive', value: 'Receive' },
      { label: 'Pending', value: 'Pending' },
    ];
  }

  render() {
    const { onCancel } = this.props;
    const resultsFormatter = {
      'title': data => _.toString(_.get(data, ['title'], '')),
      'barcode': data => _.toString(_.get(data, ['barcode'], '')),
      'location': data => _.toString(_.get(data, ['location'], '')),
      'item_status': data => _.toString(_.get(data, ['item_status'], '')),
    };

    const formatter = {
      barcode: () => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField style={{ background: 'white' }} />
            <img alt="barcode" style={{ marginLeft: '4px' }} src={imgBarcode} width="24px" />
          </div>
        );
      },
      location: () => {
        return (
          <div style={{ width: '80%' }}>
            <Select style={{ background: 'white' }} dataOptions={this.locationDD()} />
          </div>
        );
      },
      item_status: () => {
        return (
          <div style={{ width: '80%' }}>
            <Select style={{ background: 'white' }} dataOptions={this.itemStatusDD()} />
          </div>
        );
      },
    };

    const columnWidths = {
      receiving: '12%'
    };

    const columnMapping = {
      title: 'Title',
      barcode: 'Barcode',
      location: 'Location',
      item_status: 'Item Status',
    };

    return (
      <Pane id="pane-receiving" defaultWidth="fill" paneTitle="Receiving Items" onClose={onCancel} dismissible>
        <Row center="xs" style={{ textAlign: 'left' }}>
          <Col xs={8}>
            <div style={{ float: 'right', paddingTop: '10px', display: 'flex' }}>
              <Button buttonStyle="primary">Receive</Button>
            </div>
            <h3>Receive Items</h3>
            <div className={css.inputMargin}>
              <MultiColumnList
                contentData={fundDistribution}
                columnWidths={columnWidths}
                columnMapping={columnMapping}
                formatter={formatter}
                resultsFormatter={resultsFormatter}
                interactive={false}
                visibleColumns={['title', 'barcode', 'location', 'item_status']}
              />
            </div>
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default Received;
