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

import { DISCOUNT_TYPE } from '../const';

function CostView({ cost }) {
  const discountType = get(cost, 'discountType');
  const discount = get(cost, 'discount');
  const isPercentageDiscountType = discountType === DISCOUNT_TYPE.percentage;
  const displayDiscount = discount && `${discount}${isPercentageDiscountType ? '%' : ''}`;

  return (
    <React.Fragment>
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.listPrice" />}
            value={get(cost, 'listUnitPrice')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.currency" />}
            value={get(cost, 'currency')}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.quantityPhysical" />}
            value={get(cost, 'quantityPhysical')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.additionalCost" />}
            value={get(cost, 'additionalCost')}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.unitPriceOfElectronic" />}
            value={get(cost, 'listUnitPriceElectronic')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.discount" />}
            value={displayDiscount}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.quantityElectronic" />}
            value={get(cost, 'quantityElectronic')}
          />
        </Col>
        <Col xs={6}>
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
            value={get(cost, 'poLineEstimatedPrice')}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

CostView.propTypes = {
  cost: PropTypes.object,
};

export default CostView;
