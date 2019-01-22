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

class CostView extends React.Component {
  static propTypes = {
    cost: PropTypes.object,
  }

  render() {
    const { cost } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.listPrice" />}
            value={get(cost, 'list_price')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.currency" />}
            value={get(cost, 'currency')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.quantityPhysical" />}
            value={get(cost, 'quantity_physical')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.cost.quantityElectronic" />}
            value={get(cost, 'quantity_electronic')}
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
            value={get(cost, 'po_line_estimated_price')}
          />
        </Col>
      </Row>
    );
  }
}

export default CostView;
