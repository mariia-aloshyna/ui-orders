import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { KeyValue, Row, Col } from '@folio/stripes/components';

class TagView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col xs={3}>
          <KeyValue label="Tags" value={_.get(initialValues, 'tags')} />
        </Col>
      </Row>
    );
  }
}

export default TagView;
