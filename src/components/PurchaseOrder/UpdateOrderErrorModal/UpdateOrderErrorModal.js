import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Button, Modal } from '@folio/stripes/components';

const UpdateOrderErrorModal = ({ orderNumber, cancel, errors = [] }) => {
  const footer = (
    <Button
      onClick={cancel}
      marginBottom0
    >
      <FormattedMessage id="ui-orders.openOrderModal.cancel" />
    </Button>
  );

  return (
    <Modal
      label={
        <FormattedMessage
          id="ui-orders.openOrderModal.title"
          values={{ orderNumber }}
        />}
      open
      footer={footer}
      data-test-update-order-error-modal
    >
      {errors.map(({ code, poLineNumber }) => (
        <p>
          <FormattedMessage
            key={poLineNumber}
            id={`ui-orders.errors.${code}`}
            values={{ poLineNumber }}
          />
        </p>
      ))}
    </Modal>
  );
};

UpdateOrderErrorModal.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object),
};

export default UpdateOrderErrorModal;
