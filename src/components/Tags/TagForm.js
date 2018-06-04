import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { Required } from '../../Utils/Validate';

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
