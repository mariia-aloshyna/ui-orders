import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList, Pane, PaneMenu, TextField, Row, Col } from '@folio/stripes-components/';
import TextFieldIcon from '@folio/stripes-components/lib/TextField/TextFieldIcon';

class VendorsSearch extends Component {

  constructor(props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getVendors() {
    const { parentResources } = this.props;
    const vendors = (parentResources.vendor || {}).records || [];
    if (!vendors || vendors.length === 0) return [];
    return vendors;
  }

  onChange(e) {
    const { parentMutator } = this.props;
    const val = e.target.value;
    parentMutator.vendorQuery.update({
      query: val,
    });
  }

  onRowClick(e, row) {
    console.log(row);
    const { dispatch, change } = this.props;
    dispatch(change('vendor_name', `${row.name}`));
    dispatch(change('vendor', `${row.id}`));
  }

  getAddFirstMenu() {
    return (
      <PaneMenu>
        <button id="clickable-close-vendors-pane" onClick={() => this.props.showPaneVendors(false)} title="close" aria-label="Close vendors Pane" style={{ marginBottom: '0', marginLeft: '10px' }}>
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }

  render() {
    const firstMenu = this.getAddFirstMenu();
    const contentData = this.getVendors();
    const resultsFormatter = {
      'name': data => _.get(data, ['name'], ''),
      'code': data => _.get(data, ['code'], ''),
      'description': data => _.get(data, ['description'], ''),
      'vendor_status': data => _.get(data, ['vendor_status'], ''),
    };
    const columnMapping = {
      'name': 'name',
      'code': 'code',
      'description': 'description',
      'vendor_status': 'vendor status',
    };

    return (
      <Pane id="pane-vendors" defaultWidth="30%" paneTitle="Search Vendors" firstMenu={firstMenu}>
        <Row>
          <Col xs={12}>
            <TextField onChange={this.onChange} startControl={<TextFieldIcon icon="search" />} />
          </Col>
          <Col xs={12}>
            <MultiColumnList
              onRowClick={this.onRowClick}
              contentData={contentData}
              formatter={resultsFormatter}
              columnMapping={columnMapping}
              visibleColumns={['name', 'code', 'description', 'vendor_status']}
            />
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default VendorsSearch;
