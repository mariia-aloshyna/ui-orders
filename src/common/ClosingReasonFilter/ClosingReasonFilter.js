import React from 'react';
import {
  injectIntl,
  intlShape,
} from 'react-intl';

import { SelectionFilter } from '@folio/stripes-acq-components';

import { getClosingReasonsOptions } from '../utils';
import { closingReasonsShape } from '../shapes';
import { DEFAULT_CLOSE_ORDER_REASONS } from '../constants';

const ClosingReasonFilter = ({ closingReasons, intl: { formatMessage }, ...rest }) => {
  const reasons = getClosingReasonsOptions(closingReasons);
  const translatedDefaultReasons = Object.keys(DEFAULT_CLOSE_ORDER_REASONS).map(key => {
    const label = formatMessage({ id: `ui-orders.closeOrderModal.closingReasons.${key}` });

    return { value: DEFAULT_CLOSE_ORDER_REASONS[key], label };
  });

  return (
    <SelectionFilter
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
