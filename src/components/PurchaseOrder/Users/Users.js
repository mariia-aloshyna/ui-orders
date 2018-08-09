import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Pane, PaneMenu } from '@folio/stripes-components/';

class Users extends Component {

  constructor(props) {
    super(props);
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

  render() {
    const firstMenu = this.getAddFirstMenu();
    console.log(this.props);
    return (
      <Pane id="pane-users" defaultWidth="fill" paneTitle="User" firstMenu={firstMenu}>
        <p>Users goes here</p>
      </Pane>
    );
  }
}

export default Users;
