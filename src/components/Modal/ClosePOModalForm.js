import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import stripesForm from '@folio/stripes/form';
import {
  Col,
  Modal,
  ModalFooter,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';

const ClosePOModalForm = ({ close, open, orderId }) => {
  const cancelBtn = <FormattedMessage id="ui-orders.closePOModal.cancel" />;
  const submitBtn = <FormattedMessage id="ui-orders.closePOModal.submit" />;
  const footer = (
    <ModalFooter
      secondaryButton={{
        label: cancelBtn,
        onClick: close,
      }}
      primaryButton={{
        label: submitBtn,
        onClick: close,
      }}
    />
  );

  return (
    <Modal
      footer={footer}
      label={<FormattedMessage id="ui-orders.closePOModal.title" values={{ orderId }} />}
      open={open}
    >
      <Row>
        <Col xs={12}>
          <Field
            component={Select}
            label={<FormattedMessage id="ui-orders.closePOModal.reason" />}
            name="reason"
          />
          <Field
            component={TextArea}
            label={<FormattedMessage id="ui-orders.closePOModal.notes" />}
            name="notes"
          />
        </Col>
      </Row>
    </Modal>
  );
};

ClosePOModalForm.propTypes = {
  close: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default stripesForm({
  form: 'closePOModalForm',
  navigationCheck: true,
  enableReinitialize: true,
})(ClosePOModalForm);
