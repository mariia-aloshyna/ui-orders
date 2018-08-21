import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

class LicenseView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Code" value={_.get(initialValues, 'code')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Description" value={_.get(initialValues, 'description')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Reference" value={_.get(initialValues, 'reference')} />
        </Col>
      </Row>
    );
  }
}

export default LicenseView;
