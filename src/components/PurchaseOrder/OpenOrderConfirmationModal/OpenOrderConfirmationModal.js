import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Button, Modal } from '@folio/stripes/components';

import css from './OpenOrderConfirmationModal.css';

const OpenOrderConfirmationModal = ({ orderNumber, submit, cancel }) => {
  const footer = (
    <div className={css.openOrderConfirmationModalFooter}>
      <Button
        onClick={cancel}
        data-test-open-order-confirmation-modal-cancel
        marginBottom0
      >
        <FormattedMessage id="ui-orders.openOrderModal.cancel" />
      </Button>

      <Button
        buttonStyle="primary"
        data-test-open-order-confirmation-modal-submit
        marginBottom0
        onClick={submit}
      >
        <FormattedMessage id="ui-orders.openOrderModal.submit" />
      </Button>
    </div>
  );

  return (
    <Modal
      label={<FormattedMessage id="ui-orders.openOrderModal.title" values={{ orderNumber }} />}
      open
      data-test-open-order-confirmation-modal
      footer={footer}
    >
      <div
        className={css.openOrderConfirmationModalContent}
        data-test-open-order-confirmation-modal-content
      >
        <div>
          <FormattedMessage id="ui-orders.openOrderModal.message" />
        </div>
      </div>
    </Modal>
  );
};

OpenOrderConfirmationModal.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default OpenOrderConfirmationModal;
