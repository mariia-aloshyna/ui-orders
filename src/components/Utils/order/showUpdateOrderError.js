import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

const ERROR_CODES = {
  vendorIsInactive: 'vendorIsInactive',
  accessProviderIsInactive: 'accessProviderIsInactive',
  vendorNotFound: 'vendorNotFound',
  orderOpen: 'orderOpen',
  orderClosed: 'orderClosed',
  accessProviderNotFound: 'accessProviderNotFound',
};

const showUpdateOrderError = async (response, callout) => {
  let error;

  try {
    error = await response.json();
  } catch (parsingException) {
    error = response;
  }

  const errorCode = get(error, 'errors.0.code');
  const messageCode = get(ERROR_CODES, errorCode, 'orderGenericError1');

  callout.sendCallout({
    message: <FormattedMessage id={`ui-orders.errors.${messageCode}`} />,
    type: 'error',
  });
};

export default showUpdateOrderError;
