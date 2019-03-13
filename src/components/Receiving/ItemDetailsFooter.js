import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Row,
} from '@folio/stripes/components';

const ItemDetailsFooter = ({
  checkedItemsListLength,
  close,
  currentLine,
  isReceiveButtonDisabled,
  onClickNext,
  onClickPrevious,
  onClickReceive,
  poLineIdsListLenght,
}) => (
  <Row end="xs">
    <Button
      onClick={close}
    >
      <FormattedMessage id="ui-orders.receiving.cancelBtn" />
    </Button>
    <Button
      buttonStyle="primary"
      disabled={!currentLine}
      onClick={onClickPrevious}
    >
      <FormattedMessage id="ui-orders.receiving.previousBtn" />
    </Button>
    {(currentLine === poLineIdsListLenght)
      ? (
        <Button
          buttonStyle="primary"
          disabled={isReceiveButtonDisabled}
          onClick={onClickReceive}
        >
          <FormattedMessage id="ui-orders.receiving.receiveBtn" />
        </Button>
      )
      : (
        <Button
          buttonStyle="primary"
          disabled={!checkedItemsListLength}
          onClick={() => onClickNext(poLineIdsListLenght)}
        >
          <FormattedMessage id="ui-orders.receiving.nextBtn" />
        </Button>
      )
    }
  </Row>
);

ItemDetailsFooter.propTypes = {
  checkedItemsListLength: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  currentLine: PropTypes.number.isRequired,
  isReceiveButtonDisabled: PropTypes.bool.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickPrevious: PropTypes.func.isRequired,
  onClickReceive: PropTypes.func.isRequired,
  poLineIdsListLenght: PropTypes.number.isRequired,
};

export default ItemDetailsFooter;
