import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import queryString from 'query-string';
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';

class CostView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="List Unit Price" value={_.get(initialValues, 'list_price')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Currency" value={_.get(initialValues, 'currency')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Quantity Ordered" value={_.get(initialValues, 'quantity')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Estimated Price" value={_.get(initialValues, 'estimated_price')} />
        </Col>
      </Row>
    );
  }
}

export default CostView;
