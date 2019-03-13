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
            value={get(cost, 'listPrice')}
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
            value={get(cost, 'quantityPhysical')}
          />
        </Col>
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
    );
  }
}

export default CostView;
