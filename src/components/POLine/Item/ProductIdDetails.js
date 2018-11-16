import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

class ProductIdDetails extends Component {
  static propTypes = {
    itemIdDetails: PropTypes.arrayOf(PropTypes.object)
  }

  constructor(props) {
    super(props);
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  getProductDetails(val, key) {
    return (
      <Row key={key}>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.itemDetails.productId" />}
            value={get(val, 'product_id')}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-orders.itemDetails.productIdType" />}
            value={get(val, 'product_id_type')}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const { itemIdDetails } = this.props;

    return (
      <Col xs={12}>
        {itemIdDetails.map(this.getProductDetails)}
      </Col>
    );
  }
}

export default ProductIdDetails;
