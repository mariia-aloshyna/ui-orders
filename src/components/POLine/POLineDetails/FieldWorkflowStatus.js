import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';

export const WORKFLOW_STATUS = {
  closed: 'Closed',
  open: 'Open',
  pending: 'Pending',
};

class FieldWorkflowStatus extends Component {
  render() {
    return (
      <Field
        component={Select}
        label={<FormattedMessage id="ui-orders.poLine.poLineWorkflowStatus" />}
        name="po_line_workflow_status"
      >
        <FormattedMessage id="ui-orders.dropdown.select">
          {(message) => <option value="">{message}</option>}
        </FormattedMessage>
        {Object.keys(WORKFLOW_STATUS).map((key) => (
          <FormattedMessage
            id={`ui-orders.po_line_workflow_status.${key}`}
            key={key}
          >
            {(message) => <option value={WORKFLOW_STATUS[key]}>{message}</option>}
          </FormattedMessage>
        ))}
      </Field>
    );
  }
}

export default FieldWorkflowStatus;
