import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import {
  Button,
  Dropdown,
  DropdownMenu,
  Icon,
  IconButton,
  MenuSection,
} from '@folio/stripes/components';

const omitUIProps = (pieceFromUI) => omit(pieceFromUI, ['dateOrdered', 'rowIndex']);

const CheckInItemsActions = ({ showEditPieceModal, deletePiece, piece }) => {
  const [open, setOpen] = useState(false);
  const toggleActionMenu = () => setOpen(!open);
  const dehydratedPiece = omitUIProps(piece);

  return (
    <Dropdown
      id="check-in-actions"
      open={open}
      onToggle={toggleActionMenu}
      hasPadding
    >
      <IconButton
        data-role="toggle"
        icon="ellipsis"
      />
      <DropdownMenu
        data-role="menu"
        onToggle={toggleActionMenu}
      >
        <MenuSection id="order-details-actions">
          <Button
            buttonStyle="dropdownItem"
            data-test-button-delete-piece
            onClick={() => {
              toggleActionMenu();
              deletePiece(dehydratedPiece);
            }}
          >
            <Icon size="small" icon="trash">
              <FormattedMessage id="ui-orders.button.delete" />
            </Icon>
          </Button>
          <Button
            buttonStyle="dropdownItem"
            data-test-button-edit-piece
            onClick={() => {
              toggleActionMenu();
              showEditPieceModal(dehydratedPiece);
            }}
          >
            <Icon size="small" icon="edit">
              <FormattedMessage id="ui-orders.button.edit" />
            </Icon>
          </Button>
        </MenuSection>
      </DropdownMenu>
    </Dropdown>
  );
};

CheckInItemsActions.propTypes = {
  showEditPieceModal: PropTypes.func.isRequired,
  deletePiece: PropTypes.func.isRequired,
  piece: PropTypes.object.isRequired,
};

export default CheckInItemsActions;
