import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import stripesForm from '@folio/stripes/form';
import {
  Row,
  Col,
  Button,
  TextField,
} from '@folio/stripes/components';

const validate = values => {
  const errors = {};

  if (!values.value) {
    errors.value = 'Required';
  }

  return errors;
};

const ClosingReasonForm = ({ handleSubmit, cancel, submitting, pristine, invalid }) => {
  return (
    <form
      onSubmit={handleSubmit}
      data-test-closign-reason-form
    >
      <Row>
        <Col xs={8}>
          <Field
            name="value"
            type="text"
            component={TextField}
          />
        </Col>
        <Col xs={4}>
          <Button
            data-test-closing-reason-form-submit
            type="submit"
            disabled={invalid || pristine || submitting}
            marginBottom0
          >
            <FormattedMessage id="ui-orders.settings.closingReasons.saveBtn" />
          </Button>

          <Button
            data-test-closing-reason-form-cancel
            buttonStyle="danger"
            onClick={cancel}
            disabled={submitting}
            marginBottom0
          >
            <FormattedMessage id="ui-orders.settings.closingReasons.cancelBtn" />
          </Button>
        </Col>
      </Row>
    </form>
  );
};

ClosingReasonForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default stripesForm({ validate })(ClosingReasonForm);
