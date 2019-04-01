import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Row,
} from '@folio/stripes/components';

const ItemsListModalFooter = ({ close, submit, isCheckInButtonDisabled }) => (
  <Row end="xs">
    <Button
      data-test-cancel-button
      onClick={close}
    >
      <FormattedMessage id="ui-orders.checkIn.buttons.cancel" />
    </Button>
    <Button
      buttonStyle="primary"
      data-test-check-in-button
      disabled={!isCheckInButtonDisabled}
      onClick={submit}
    >
      <FormattedMessage id="ui-orders.checkIn.buttons.checkIn" />
    </Button>
  </Row>
);

ItemsListModalFooter.propTypes = {
  close: PropTypes.func.isRequired,
  isCheckInButtonDisabled: PropTypes.number.isRequired,
  submit: PropTypes.func.isRequired,
};

export default ItemsListModalFooter;
