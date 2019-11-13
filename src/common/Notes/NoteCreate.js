import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';

import { NoteCreatePage } from '@folio/stripes/smart-components';

import {
  ORDERS_DOMAIN,
  ORDERS_ROUTE,
} from '../constants';
import { getReferredEntityData } from './util';

const translationKeys = {
  poLine: 'ui-orders.poLine',
};

const NoteCreate = ({
  history: { goBack },
  location: { state },
}) => {
  const referredEntityData = getReferredEntityData(state);

  if (!state) {
    return <Redirect to={ORDERS_ROUTE} />;
  }

  return (
    <NoteCreatePage
      domain={ORDERS_DOMAIN}
      entityTypeTranslationKeys={translationKeys}
      navigateBack={goBack}
      paneHeaderAppIcon="orders"
      referredEntityData={referredEntityData}
    />
  );
};

NoteCreate.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default NoteCreate;
