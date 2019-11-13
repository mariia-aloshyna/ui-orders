import React, { useCallback } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { NoteEditPage } from '@folio/stripes/smart-components';

import {
  NOTES_ROUTE,
  ORDERS_DOMAIN,
} from '../constants';
import { getReferredEntityData } from './util';

const translationKeys = {
  poLine: 'ui-orders.poLine.pluralized',
};

const NoteEdit = ({
  history,
  location: { state },
  match: { params: { id } },
}) => {
  const goToNoteView = useCallback(
    () => {
      history.replace({
        pathname: `${NOTES_ROUTE}/${id}`,
        state,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  );

  const referredEntityData = getReferredEntityData(state);

  return (
    <NoteEditPage
      domain={ORDERS_DOMAIN}
      entityTypePluralizedTranslationKeys={translationKeys}
      entityTypeTranslationKeys={{ poLine: 'ui-orders.poLine' }}
      navigateBack={goToNoteView}
      noteId={id}
      paneHeaderAppIcon="orders"
      referredEntityData={referredEntityData}
    />
  );
};

NoteEdit.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default NoteEdit;
