import {
  collection,
  interactor,
} from '@bigtest/interactor';

export default interactor(class PieceDetailsModal {
  static defaultScope = '#data-test-piece-details-modal';
  piecesInLine = collection('[class*=mclRow---]');
});
