import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
} from 'redux-form';
import {
  Button,
  Col,
  Row,
  TextArea,
} from '@folio/stripes/components';

const renderNotesField = ({ input, label }) => (
  <Field
    component={TextArea}
    {...input}
    label={label}
  />
);

const NotesForm = ({ fields }) => (
  <Row>
    {fields.map((note, index) => (
      <Fragment>
        <Col xs={11} key={index}>
          <Field
            name={note}
            type="text"
            component={renderNotesField}
          />
        </Col>
        <Col xs={1}>
          <Button
            onClick={() => fields.remove(index)}
            buttonStyle="danger"
          >
            <FormattedMessage id="ui-orders.orderDetails.removeNoteBtn" />
          </Button>
        </Col>
      </Fragment>
    ))}
    <Col xs={12}>
      <Button onClick={() => fields.push()}>
        <FormattedMessage id="ui-orders.orderDetails.addNoteBtn" />
      </Button>
    </Col>
  </Row>
);

NotesForm.displayName = 'NotesForm';

NotesForm.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default NotesForm;
