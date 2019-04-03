import React from 'react';
import PropTypes from 'prop-types';

import { Pane } from '@folio/stripes/components';

import AddClosingReason from './AddClosingReason';
import ClosingReasonItem from './ClosingReasonItem';

const ClosingReasons = ({ title, reasons, saveReason, removeReason }) => {
  return (
    <Pane
      defaultWidth="100%"
      fluidContentWidth
      paneTitle={title}
    >
      <AddClosingReason saveReason={saveReason} />
      <div data-test-order-settings-closing-orders-list>
        {
          reasons.map(reason => (
            <ClosingReasonItem
              key={reason.id || reason.code}
              id={reason.id}
              value={reason.value}
              isSystem={!reason.id}
              saveReason={saveReason}
              removeReason={removeReason}
            />
          ))
        }
      </div>
    </Pane>
  );
};

ClosingReasons.propTypes = {
  title: PropTypes.node.isRequired,
  reasons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    code: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  saveReason: PropTypes.func.isRequired,
  removeReason: PropTypes.func.isRequired,
};

export default ClosingReasons;
