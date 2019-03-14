import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { some } from 'lodash';

import {
  Button,
  Row,
} from '@folio/stripes/components';

const ItemDetailsFooter = ({
  close,
  currentLine,
  lineItems,
  onClickNext,
  onClickPrevious,
  poLineIdsListLenght,
}) => {
  const isButtonDisabled = !some(Object.values(lineItems).flat(), { isSelected: true });

  return (
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
            disabled={isButtonDisabled}
            onClick={() => onClickNext(poLineIdsListLenght)}
          >
            <FormattedMessage id="ui-orders.receiving.receiveBtn" />
          </Button>
        )
        : (
          <Button
            buttonStyle="primary"
            disabled={isButtonDisabled}
            onClick={() => onClickNext(poLineIdsListLenght)}
          >
            <FormattedMessage id="ui-orders.receiving.nextBtn" />
          </Button>
        )
      }
    </Row>
  );
};

ItemDetailsFooter.propTypes = {
  close: PropTypes.func.isRequired,
  currentLine: PropTypes.number.isRequired,
  lineItems: PropTypes.object.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickPrevious: PropTypes.func.isRequired,
  poLineIdsListLenght: PropTypes.number.isRequired,
};

export default ItemDetailsFooter;
