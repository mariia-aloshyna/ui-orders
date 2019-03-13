import { some } from 'lodash';

import {
  ITEM_STATUS,
  PIECE_STATUS_RECEIVED,
} from './const';

export const reducePieces = (pieces, isSelect = false) => {
  const pieceReducer = (accumulator, piece) => {
    accumulator[piece.id] = isSelect ? piece : null;

    return accumulator;
  };

  return pieces.reduce(pieceReducer, {});
};

export const historyRemoveItems = (checkedPiecesMap, mutator) => {
  const pieces = Object.values(checkedPiecesMap).filter(Boolean);
  const linesMap = {};

  pieces.forEach(({ id, poLineId }) => {
    const item = {
      itemStatus: ITEM_STATUS.onOrder,
      pieceId: id,
    };
    const line = linesMap[poLineId];

    if (line) {
      line.received += 1;
      line.receivedItems.push(item);
    } else {
      linesMap[poLineId] = {
        poLineId,
        received: 1,
        receivedItems: [item],
      };
    }
  });

  const postData = {
    toBeReceived: Object.values(linesMap),
    totalRecords: pieces.length,
  };

  return mutator.POST(postData).then(({ receivingResults }) => {
    if (some(receivingResults, ({ processedWithError }) => processedWithError > 0)) {
      return Promise.reject(receivingResults);
    }

    return receivingResults;
  });
};

export const receiveItems = (itemList, mutator) => {
  const pieces = itemList.filter(item => item.isSelected === true);
  const linesMap = {};

  pieces.forEach(piece => {
    const item = {
      barcode: piece.barcode || '',
      comment: piece.receivingNote,
      itemStatus: PIECE_STATUS_RECEIVED,
      locationId: piece.locationId,
      pieceId: piece.id,
    };
    const line = linesMap[piece.poLineId];

    if (line) {
      line.received += 1;
      line.receivedItems.push(item);
    } else {
      linesMap[piece.poLineId] = {
        poLineId: piece.poLineId,
        received: 1,
        receivedItems: [item],
      };
    }
  });

  const postData = {
    toBeReceived: Object.values(linesMap),
    totalRecords: pieces.length,
  };

  return mutator.POST(postData).then(({ receivingResults }) => {
    if (some(receivingResults, ({ processedWithError }) => processedWithError > 0)) {
      return Promise.reject(receivingResults);
    }

    return receivingResults;
  });
};
