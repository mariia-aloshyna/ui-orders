import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Checkbox,
  MultiColumnList,
} from '@folio/stripes/components';

const PiecesList = ({ checkedItemsMap, items = [], toggleItem, toggleAll, isAllChecked = false }) => {
  const resultsFormatter = {
    'isChecked': piece => (
      <Checkbox
        checked={!!checkedItemsMap[piece.id]}
        type="checkbox"
        onChange={() => toggleItem(piece)}
      />
    ),
    'title': piece => piece.title,
    'piece': piece => piece.caption,
    'supplement': piece => (
      <Checkbox
        checked={piece.supplement}
        disabled
        type="checkbox"
      />
    ),
    'poLineNumber': piece => piece.poLineNumber,
    'comment': piece => piece.comment,
    'pieceStatus': piece => piece.receivingStatus,
  };

  return (
    <MultiColumnList
      contentData={items}
      formatter={resultsFormatter}
      visibleColumns={['isChecked', 'title', 'piece', 'supplement', 'poLineNumber', 'comment', 'pieceStatus']}
      columnMapping={{
        isChecked: (
          <Checkbox
            name="isAllChecked"
            checked={isAllChecked}
            type="checkbox"
            onChange={toggleAll}
          />
        ),
        title: <FormattedMessage id="ui-orders.receiving.title" />,
        piece: <FormattedMessage id="ui-orders.checkIn.piece" />,
        supplement: <FormattedMessage id="ui-orders.checkIn.supplement" />,
        poLineNumber: <FormattedMessage id="ui-orders.receiving.poLine" />,
        comment: <FormattedMessage id="ui-orders.checkIn.comment" />,
        pieceStatus: <FormattedMessage id="ui-orders.checkIn.pieceStatus" />,
      }}
      columnWidths={{
        isChecked: '2%',
        title: '30%',
        piece: '30%',
        supplement: '8%',
        poLineNumber: '10%',
        comment: '10%',
        pieceStatus: '10%',
      }}
      onRowClick={(_, item) => toggleItem(item)}
    />
  );
};

PiecesList.propTypes = {
  checkedItemsMap: PropTypes.object,
  isAllChecked: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  toggleAll: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
};

export default PiecesList;
