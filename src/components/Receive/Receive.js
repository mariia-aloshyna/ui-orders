import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField, MultiColumnList, Row, Col, KeyValue, Button, Dropdown, DropdownMenu, IconButton } from '@folio/stripes-components';

const fundDistribution = [
  {
    'title': 'Lorem ipsum des tis metis',
    'polline': 'po line',
    'received': 'received',
    'date_ordered': '',
    'receiving': '',
    'receiving_note': '',
    'status': ''
  },
  {
    'title': 'dos',
    'polline': '',
    'received': '',
    'date_ordered': '',
    'receiving': '',
    'receiving_note': '',
    'status': ''
  },
  {
    'title': 'tres',
    'polline': '',
    'received': '',
    'date_ordered': '',
    'receiving': '',
    'receiving_note': '',
    'status': ''
  },
  {
    'title': 'quatro',
    'polline': '',
    'received': '',
    'date_ordered': '',
    'receiving': '',
    'receiving_note': '',
    'status': ''
  },
];

class Receive extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.dropDownMenu = this.dropDownMenu.bind(this);
    this.getRowURL = this.getRowURL.bind(this);
    this.anchoredRowFormatter = this.anchoredRowFormatter.bind(this);
  }

  getRowURL(rowData) {
    return `url/with/${rowData.info}`;
  }

  anchoredRowFormatter({ rowIndex, rowClass, rowData, cells, rowProps, labelStrings }) {
    return (
      <div key={`row-${rowIndex}`} className={rowClass} {...rowProps}>
        {cells}
        <div role="gridcell" style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>{this.dropDownMenu(`${rowIndex}`)}</div>
      </div>
    );
  }
  // onToggle={this.onToggleDropdown} onClick={}
  // open={isOpen}
  dropDownMenu = (rowIndex) => {
    const isOpen = (this.state.dropdowns || false)[`${rowIndex}-menu`] || false;
    return (
      <Dropdown id="Menu" open={isOpen} onToggle={this.onToggleDropdown} group style={{ float: 'right' }} pullRight>
        <IconButton icon="ellipsis" onClick={() => this.onClickButton(`${rowIndex}-menu`)} />
        <DropdownMenu data-role="menu" aria-label="available permissions">
          <ul>
            <li><a href="#">Example Link 1</a></li>
            <li><a href="#">Example Link 2</a></li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    );
  }

  onToggleDropdown = () => {
    // const menuStatus = this.state.dropdowns; close all menu
    const menuStatus = this.state.dropdowns || false;
    if (!menuStatus) return false;
  }

  onClickButton = (stateName) => {
    const menuStatus = this.state.dropdowns || [];
    menuStatus[`${stateName}-menu`] = !menuStatus[`${stateName}-menu`];
    console.log(menuStatus);
    return this.setState({ dropdowns: menuStatus });
  }

  render() {
    const { initialValues } = this.props;
    const resultsFormatter = {
      'title': data => _.toString(_.get(data, ['title'], '')),
      'polline': data => _.toString(_.get(data, ['polline'], '')),
      'received': data => _.toString(_.get(data, ['received'], '')),
      'date_ordered': data => _.toString(_.get(data, ['date_ordered'], '')),
      'receiving': data => _.toString(_.get(data, ['receiving'], '')),
      'receiving_note': data => _.toString(_.get(data, ['receiving_note'], '')),
      'status': data => _.toString(_.get(data, ['status'], '')),
    };

    return (
      <Row center="xs" style={{ textAlign: 'left' }}>
        <Col xs={8}>
          <div style={{ float: 'right', paddingTop: '10px', display: 'flex' }}>
            <div style={{ marginRight: '5px' }}>
              <TextField id="receive-search-field" />
            </div>
            <Button buttonStyle="primary">Cancel</Button>
            <Button buttonStyle="primary">Receive All</Button>
            <Button buttonStyle="primary">Receive</Button>
          </div>
          <h3>Receive Items</h3>
          <MultiColumnList
            contentData={fundDistribution}
            resultsFormatter={resultsFormatter}
            interactive={false}
            rowFormatter={this.anchoredRowFormatter}
            visibleColumns={['title', 'polline', 'received', 'date_ordered', 'receiving', 'receiving_note', 'status']}
          />
        </Col>
      </Row>
    );
  }
}

export default Receive;
