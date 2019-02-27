import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Row,
} from '@folio/stripes/components';

const ItemDetailsFooter = ({ close }) => (
  <Row end="xs">
    <Button
      onClick={close}
    >
      <FormattedMessage id="ui-orders.receiving.cancelBtn" />
    </Button>
    <Button
      buttonStyle="primary"
      disabled
    >
      <FormattedMessage id="ui-orders.receiving.previousBtn" />
    </Button>
    <Button
      buttonStyle="primary"
      disabled
    >
      <FormattedMessage id="ui-orders.receiving.nextBtn" />
    </Button>
  </Row>
);

ItemDetailsFooter.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ItemDetailsFooter;
