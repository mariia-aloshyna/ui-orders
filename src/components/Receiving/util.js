import { ITEM_STATUS } from './const';

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
  const postData = { toBeReceived: Object.values(linesMap) };

  return mutator.POST(postData);
};
