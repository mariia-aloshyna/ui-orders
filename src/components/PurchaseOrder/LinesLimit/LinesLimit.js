import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Button,
  Col,
  Modal,
  Row,
} from '@folio/stripes/components';

import css from './LinesLimit.css';

const LinesLimit = ({ isOpen, closeModal, createOrder }) => (
  <Modal
    label={<FormattedMessage id="ui-orders.linesLimit.label" />}
    open={isOpen}
  >
    <Row>
      <Col xs={12}>
        <FormattedMessage id="ui-orders.linesLimit.reasonText" />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <FormattedMessage id="ui-orders.linesLimit.adviceText" />
      </Col>
    </Row>
    <Row>
      <Col
        className={css.buttonsLine}
        xs={12}
      >
        <Button
          onClick={closeModal}
          buttonStyle="primary"
        >
          <FormattedMessage id="ui-orders.linesLimit.okBtn" />
        </Button>
        <Button
          onClick={() => {
            createOrder();
            closeModal();
          }}
        >
          <FormattedMessage id="ui-orders.linesLimit.createBtn" />
        </Button>
      </Col>
    </Row>
  </Modal>
);

LinesLimit.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  createOrder: PropTypes.func.isRequired,
};

LinesLimit.displayName = 'LinesLimit';

export default LinesLimit;
