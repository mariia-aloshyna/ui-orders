import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Col,
  InfoPopover,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import { AmountWithCurrencyField } from '@folio/stripes-acq-components';

import { DISCOUNT_TYPE } from '../const';

function CostView({ cost }) {
  const discountType = get(cost, 'discountType');
  const discount = get(cost, 'discount', 0);
  const currency = get(cost, 'currency');
  const isPercentageDiscountType = discountType === DISCOUNT_TYPE.percentage;
  const displayDiscount = isPercentageDiscountType
    ? `${discount}%`
    : (
      <AmountWithCurrencyField
        currency={currency}
        amount={discount}
      />
    );

  return (
    <Row start="xs">
      <Col
        data-col-cost-list-unit-price
        xs={6}
        lg={3}
      >
        <KeyValue label={<FormattedMessage id="ui-orders.cost.listPrice" />}>
          <AmountWithCurrencyField
            currency={currency}
            amount={get(cost, 'listUnitPrice')}
          />
        </KeyValue>
      </Col>
      <Col
        data-col-cost-currency
        xs={6}
        lg={3}
      >
        <KeyValue
          label={<FormattedMessage id="ui-orders.cost.currency" />}
          value={currency}
        />
      </Col>
      <Col
        data-col-cost-qty-physical
        xs={6}
        lg={3}
      >
        <KeyValue
          label={<FormattedMessage id="ui-orders.cost.quantityPhysical" />}
          value={get(cost, 'quantityPhysical')}
        />
      </Col>
      <Col
        data-col-cost-addition-cost
        xs={6}
        lg={3}
      >
        <KeyValue label={<FormattedMessage id="ui-orders.cost.additionalCost" />}>
          <AmountWithCurrencyField
            currency={currency}
            amount={get(cost, 'additionalCost')}
          />
        </KeyValue>
      </Col>
      <Col
        data-col-cost-qty-unit-price-electronic
        xs={6}
        lg={3}
      >
        <KeyValue
          label={<FormattedMessage id="ui-orders.cost.unitPriceOfElectronic" />}
          value={get(cost, 'listUnitPriceElectronic')}
        />
      </Col>
      <Col
        data-col-cost-discount
        xs={6}
        lg={3}
      >
        <KeyValue
          label={<FormattedMessage id="ui-orders.cost.discount" />}
          value={displayDiscount}
        />
      </Col>
      <Col
        data-col-cost-qty-electronic
        xs={6}
        lg={3}
      >
        <KeyValue
          label={<FormattedMessage id="ui-orders.cost.quantityElectronic" />}
          value={get(cost, 'quantityElectronic')}
        />
      </Col>
      <Col
        data-col-cost-estimated-price
        xs={6}
        lg={3}
      >
        <KeyValue
          label={
            <div>
              <span>
                <FormattedMessage id="ui-orders.cost.estimatedPrice" />
              </span>
              <InfoPopover
                buttonLabel={<FormattedMessage id="ui-orders.cost.buttonLabel" />}
                content={<FormattedMessage id="ui-orders.cost.info" />}
              />
            </div>
          }
        >
          <AmountWithCurrencyField
            currency={currency}
            amount={get(cost, 'poLineEstimatedPrice')}
          />
        </KeyValue>
      </Col>
    </Row>
  );
}

CostView.propTypes = {
  cost: PropTypes.object,
};

CostView.defaultProps = {
  cost: {},
};

export default CostView;
