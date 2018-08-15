import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList, Pane, PaneMenu, TextField, Row, Col } from '@folio/stripes-components/';
import TextFieldIcon from '@folio/stripes-components/lib/TextField/TextFieldIcon';

class UsersSearch extends Component {

  constructor(props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getUsers() {
    const { parentResources } = this.props;
    const users = (parentResources.user || {}).records || [];
    if (!users || users.length === 0) return [];
    return users;
  }

  onChange(e) {
    const { parentMutator } = this.props;
    const val = e.target.value;
    parentMutator.userQuery.update({
      query: val,
    });
  }

  onRowClick(e, row) {
    const { dispatch, change } = this.props;
    dispatch(change('assigned_to_user', `${row.personal.firstName} ${row.personal.lastName}`));
    dispatch(change('assigned_to', `${row.id}`));
  }

  getAddFirstMenu() {
    return (
      <PaneMenu>
        <button id="clickable-close-users-pane" onClick={() => this.props.showPaneUsers(false)} title="close" aria-label="Close users Pane" style={{ marginBottom: '0', marginLeft: '10px' }}>
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }

  render() {
    const firstMenu = this.getAddFirstMenu();
    const contentData = this.getUsers();
    const resultsFormatter = {
      'username': data => _.get(data, ['username'], ''),
      'type': data => _.get(data, ['type'], ''),
      'firstname': data => data.personal.firstName || '',
      'lastname': data => data.personal.lastName || ''
    };
    const columnMapping = {
      'username': 'Username',
      'type': 'Type',
      'firstname': 'First Name',
      'lastname': 'Last Name',
    };
    const columnWidths = {
      'username': '30%',
      'type': '20%',
      'firstname': '30%',
      'lastname': '20%'
    };

    return (
      <Pane id="pane-users" defaultWidth="30%" paneTitle="Search Users" firstMenu={firstMenu}>
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
              columnWidths={columnWidths}
              visibleColumns={['username', 'type', 'firstname', 'lastname']}
            />
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default UsersSearch;
