import React from 'react';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { RepeatableField } from '@folio/stripes-components';
import css from './RepeatableFieldWithErrorMessage.css';

export const RepeatableFieldWithErrorMessage = (props) => { // eslint-disable-line import/prefer-default-export
  const error = get(props, 'meta.error');

  return (
    <React.Fragment>
      {error && (
        <div className={css.feedbackError}>
          <FormattedMessage id={`ui-orders.location.${error}`} />
        </div>
      )}
      <RepeatableField {...props} />
    </React.Fragment>
  );
};
