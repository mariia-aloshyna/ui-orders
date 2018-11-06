import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, InfoPopover, Row, Col } from '@folio/stripes/components';

class CostView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <KeyValue label="List Unit Price" value={_.get(initialValues, ['cost', 'list_price'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Currency" value={_.get(initialValues, ['cost', 'currency'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Quantity Physical" value={_.get(initialValues, ['cost', 'quantity_physical'])} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Quantity electronic" value={_.get(initialValues, ['cost', 'quantity_electronic'])} />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={
              <div>
                <span>Estimated Price</span>
                <InfoPopover
                  content="List Price x Quantity Ordered"
                  buttonLabel="Read more"
                />
              </div>
            }
            value={_.get(initialValues, ['cost', 'po_line_estimated_price'])}
          />
        </Col>
      </Row>
    );
  }
}

export default CostView;
