import React from 'react';
import {
  injectIntl,
  intlShape,
} from 'react-intl';

import OrdersSelectionFilter from '../OrdersSelectionFilter';
import { getClosingReasonsOptions } from '../utils';
import { closingReasonsShape } from '../shapes';
import { DEFAULT_CLOSE_ORDER_REASONS } from '../constants';

const ClosingReasonFilter = ({ closingReasons, intl: { formatMessage }, ...rest }) => {
  const reasons = getClosingReasonsOptions(closingReasons);
  const translatedDefaultReasons = Object.keys(DEFAULT_CLOSE_ORDER_REASONS).map(key => {
    const label = formatMessage({ id: `ui-orders.closeOrderModal.closingReasons.${key}` });

    return { value: key, label };
  });

  return (
    <OrdersSelectionFilter
      {...rest}
      options={[...reasons, ...translatedDefaultReasons]}
    />
  );
};

ClosingReasonFilter.propTypes = {
  closingReasons: closingReasonsShape,
  intl: intlShape.isRequired,
};

export default injectIntl(ClosingReasonFilter);
