import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  Button,
  Checkbox,
  Col,
  Modal,
  ModalFooter,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import { Required } from '../Utils/Validate';
import FieldPieceFormat from './FieldPieceFormat';

const footer = (close, save) => (
  <ModalFooter>
    <Button
      buttonStyle="primary"
      data-test-add-piece-save
      onClick={save}
    >
      <FormattedMessage id="ui-orders.checkIn.buttons.save" />
    </Button>
    <Button
      buttonStyle="primary"
      data-test-add-piece-check-in
    >
      <FormattedMessage id="ui-orders.checkIn.buttons.checkIn" />
    </Button>
    <Button
      data-test-add-piece-cancel
      onClick={close}
    >
      <FormattedMessage id="ui-orders.checkIn.buttons.cancel" />
    </Button>
  </ModalFooter>
);

class AddPieceModal extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
    showPieceFormatField: PropTypes.bool,
  }

  render() {
    const { close, handleSubmit, locations = [], showPieceFormatField = false } = this.props;

    return (
      <Modal
        id="add-piece-modal"
        label={<FormattedMessage id="ui-orders.checkIn.addPieceModal.title" />}
        footer={footer(close, handleSubmit)}
        open
      >
        <form>
          <Row>
            <Col xs>
              <Field
                component={TextField}
                fullWidth
                label={<FormattedMessage id="ui-orders.checkIn.caption" />}
                name="caption"
                required
                type="text"
                validate={Required}
              />
            </Col>
            <Col xs>
              <Field
                component={TextArea}
                fullWidth
                label={<FormattedMessage id="ui-orders.checkIn.comment" />}
                name="comment"
              />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <Field
                component={Select}
                dataOptions={locations}
                fullWidth
                label={<FormattedMessage id="ui-orders.checkIn.location" />}
                name="locationId"
                placeholder=" "
              />
            </Col>
            <Col xs>
              <Field
                component={Checkbox}
                fullWidth
                label={<FormattedMessage id="ui-orders.checkIn.supplement" />}
                name="supplement"
                type="checkbox"
              />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <Button onClick={close}>
                <FormattedMessage id="ui-orders.checkIn.buttons.addItem" />
              </Button>
            </Col>
            {showPieceFormatField && (
              <Col xs>
                <FieldPieceFormat />
              </Col>
            )}
          </Row>
        </form>
      </Modal>
    );
  }
}

export default stripesForm({
  form: 'AddPieceModalForm',
  navigationCheck: true,
})(AddPieceModal);
