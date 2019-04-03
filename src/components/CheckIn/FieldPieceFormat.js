import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { Select } from '@folio/stripes/components';

import { Required } from '../Utils/Validate';

export const PIECE_FORMAT = {
  electronic: 'Electronic',
  physical: 'Physical',
  other: 'Other',
};

const FieldPieceFormat = () => (
  <Field
    component={Select}
    label={<FormattedMessage id="ui-orders.checkIn.pieceFormat" />}
    name="format"
    required
    placeholder=" "
    validate={Required}
  >
    {Object.keys(PIECE_FORMAT).map((key) => (
      <FormattedMessage
        id={`ui-orders.pieceFormat.${key}`}
        key={key}
      >
        {(message) => <option value={PIECE_FORMAT[key]}>{message}</option>}
      </FormattedMessage>
    ))}
  </Field>
);

export default FieldPieceFormat;
