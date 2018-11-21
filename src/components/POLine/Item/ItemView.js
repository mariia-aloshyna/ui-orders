import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import toString from 'lodash/toString';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import ProductIdDetails from './ProductIdDetails';

class ItemView extends Component {
  static propTypes = {
    itemDetails: PropTypes.object.isRequired
  }

  render() {
    const { itemDetails } = this.props;

    return (
      <Fragment>
        <Row>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.itemDetails.receivingNote" />}
              value={get(itemDetails, 'receiving_note')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionFrom" />}
              value={toString(get(itemDetails, 'subscription_from'))}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionInterval" />}
              value={get(itemDetails, 'subscription_interval')}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionTo" />}
              value={toString(get(itemDetails, 'subscription_to'))}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              label={<FormattedMessage id="ui-orders.itemDetails.materialTypes" />}
              value={toString(get(itemDetails, 'material_types'))}
            />
          </Col>
        </Row>
        <Row>
          <ProductIdDetails itemIdDetails={itemDetails.product_ids} />
        </Row>
      </Fragment>
    );
  }
}

export default ItemView;
