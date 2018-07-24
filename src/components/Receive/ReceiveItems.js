import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import _ from 'lodash';
import { TextField, MultiColumnList, Row, Col, Button, Pane, Layer } from '@folio/stripes-components';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import TableDropdownMenu from './TableDropdownMenu';

const fundDistribution = [
  {
    'title': 'Lorem ipsum des tis metis',
    'polline': 'po line',
    'received': 'received',
    'date_ordered': '',
    'receiving': '1/3',
    'receiving_note': '',
    'status': ''
  },
  {
    'title': 'dos',
    'polline': '',
    'received': '',
    'date_ordered': '',
    'receiving': '1/3',
    'receiving_note': '',
    'status': ''
  },
  {
    'title': 'tres',
    'polline': '',
    'received': '',
    'date_ordered': '',
    'receiving': '1/3',
    'receiving_note': '',
    'status': ''
  },
  {
    'title': 'quatro',
    'polline': '',
    'received': '',
    'date_ordered': '',
    'receiving': '1/3',
    'receiving_note': '',
    'status': ''
  },
];

class ReceiveItems extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    location: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.transitionToParams = transitionToParams.bind(this);
  }

  openReceive = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'received-test' });
  }

  render() {
    const { onCancel, location, openReceived } = this.props;
    const query = location.search ? queryString.parse(location.search) : {};
    const resultsFormatter = {
      'title': data => _.toString(_.get(data, ['title'], '')),
      'polline': data => _.toString(_.get(data, ['polline'], '')),
      'date_ordered': data => _.toString(_.get(data, ['date_ordered'], '')),
      'receiving_note': data => _.toString(_.get(data, ['receiving_note'], '')),
    };

    const formatter = {
      receiving: data => {
        return (
          <span style={{ width: '100%' }}>
            <TextField style={{ background: 'white' }} />
          </span>
        );
      },
      menu: data => <TableDropdownMenu id={`id-${data.rowIndex}`} rowIndex={`row-${data.rowIndex}`} />
    };

    const columnWidths = {
      receiving: '12%'
    };

    const columnMapping = {
      polline: 'PO Line',
      date_ordered: 'Date Ordered',
      receiving_note: 'Receiving Note',
      menu: ''
    };

    return (
      <Pane id="pane-receiving-items" defaultWidth="fill" paneTitle="Receiving Items" onClose={onCancel} dismissible>
        <Row center="xs" style={{ textAlign: 'left' }}>
          <Col xs={8}>
            <div style={{ float: 'right', paddingTop: '10px', display: 'flex' }}>
              <Button buttonStyle="primary">Cancel</Button>
              <Button buttonStyle="primary">Receive All</Button>
              <Button buttonStyle="primary" onClick={openReceived}>Receive</Button>
            </div>
            <h3>Receive Items</h3>
            <MultiColumnList
              contentData={fundDistribution}
              columnWidths={columnWidths}
              columnMapping={columnMapping}
              formatter={formatter}
              resultsFormatter={resultsFormatter}
              interactive={false}
              visibleColumns={['title', 'polline', 'received', 'date_ordered', 'receiving', 'receiving_note', 'status', 'menu']}
            />
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default ReceiveItems;
