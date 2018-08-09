import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownMenu, IconButton } from '@folio/stripes-components';
import css from './css/TableDropdownMenu.css';

class TableDropdownMenu extends React.Component {
  static propTypes = {
    // initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onToggleDropdown = this.onToggleDropdown.bind(this);
  }

  onToggleDropdown = () => {
    const { rowIndex } = this.props;
    const itemValue = this.state[`item-${rowIndex}`] || false;
    console.log(itemValue);
    this.setState({ [`item-${rowIndex}`]: !itemValue });
  }

  render() {
    const { rowIndex } = this.props;
    const isOpen = this.state[`item-${rowIndex}`] || false;
    return (
      <div role="gridcell">
        <Dropdown id="Menu" open={isOpen} onToggle={this.onToggleDropdown} group style={{ float: 'right' }} pullRight>
          <IconButton icon="ellipsis" onClick={() => this.onToggleDropdown()} />
          <DropdownMenu data-role="menu" aria-label="available permissions">
            <ul style={{ padding: '5px' }} className={css.menuItem}>
              <li><a href="#">Link {rowIndex}</a></li>
              <li><a href="#">Link {rowIndex}</a></li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default TableDropdownMenu;

