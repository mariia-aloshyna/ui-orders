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

const LinesLimit = ({ cancel, createOrder }) => (
  <Modal
    data-test-lines-limit-modal
    label={<FormattedMessage id="ui-orders.linesLimit.label" />}
    open
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
          buttonStyle="primary"
          data-test-ok-button
          onClick={cancel}
        >
          <FormattedMessage id="ui-orders.linesLimit.okBtn" />
        </Button>
        <Button
          data-test-clone-order-and-create-line
          onClick={createOrder}
        >
          <FormattedMessage id="ui-orders.linesLimit.createBtn" />
        </Button>
      </Col>
    </Row>
  </Modal>
);

LinesLimit.propTypes = {
  cancel: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
};

LinesLimit.displayName = 'LinesLimit';

export default LinesLimit;
