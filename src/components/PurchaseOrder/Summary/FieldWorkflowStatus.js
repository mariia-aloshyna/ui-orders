import React from 'react';
import { FormattedMessage } from 'react-intl';

import { FieldSelect } from '@folio/stripes-acq-components';

import { WORKFLOW_STATUS } from '../../../common/constants';

const WORKFLOW_STATUS_OPTIONS = Object.keys(WORKFLOW_STATUS).map((key) => ({
  labelId: `ui-orders.workflowStatus.${key}`,
  value: WORKFLOW_STATUS[key],
}));

function FieldWorkflowStatus() {
  return (
    <FieldSelect
      dataOptions={WORKFLOW_STATUS_OPTIONS}
      label={<FormattedMessage id="ui-orders.orderSummary.workflowStatus" />}
      name="workflowStatus"
    />
  );
}

export default FieldWorkflowStatus;
