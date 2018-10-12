import React, { Component } from 'react';
import { Field } from 'redux-form';
import { TextArea, Row, Col } from '@folio/stripes/components';

class TagForm extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Field label="Tags" name="tag" id="tag" component={TextArea} fullWidth />
        </Col>
      </Row>
    );
  }
}

export default TagForm;
