import React from 'react';
import { FieldArray } from 'redux-form';

import NotesForm from '../../../components/NotesForm';

const FieldsNotes = () => {
  return (
    <FieldArray
      name="notes"
      component={NotesForm}
    />
  );
};

export default FieldsNotes;
