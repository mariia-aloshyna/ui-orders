import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Pane from '@folio/stripes-components/lib/Pane';
import queryString from 'query-string';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import css from './POLineView.css';

class POLineView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object
  }

  render() {
    const { location, initialValues } = this.props;
    return (
      <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" dismissible>
        <Row>
          <Col xs={3}>
            <h2>Po Line View</h2>
          </Col>
        </Row>
      </Pane>
    );
  }
}

export default POLineView;
