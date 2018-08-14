import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList, IconButton, PaneMenu, TextField, Row, Col } from '@folio/stripes-components/';
import TextFieldIcon from '@folio/stripes-components/lib/TextField/TextFieldIcon';

class Users extends Component {

  constructor(props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }

  getUsers() {
    const { parentResources } = this.props;
    const users = (parentResources.user || {}).records || [];
    if (!users || users.length === 0) return [];
    return users;
  }

  getAddFirstMenu() {
    return (
      <PaneMenu>
        <IconButton
          title="back"
          icon="left-arrow"
          // onClick={this.props.onBacktoEdit}
        />
      </PaneMenu>
    );
  }

  onRowClick(e, row) {
    const { blur, onUpdateAssignedTo } = this.props;
    onUpdateAssignedTo(e, row);
    blur();
    this.props.change();
    this.props.reset();
  }

  render() {
    const firstMenu = this.getAddFirstMenu();
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

    console.log(this.props);
    return (
      <div>
        <Row>
          <Col xs={12}>
            <TextField startControl={<TextFieldIcon icon="search" />} />
          </Col>
          <Col xs={12}>
            <MultiColumnList
              onRowClick={this.onRowClick}
              contentData={this.getUsers()}
              formatter={resultsFormatter}
              columnMapping={columnMapping}
              columnWidths={columnWidths}
              visibleColumns={['username', 'type', 'firstname', 'lastname']}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Users;
