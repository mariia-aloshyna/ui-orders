import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';
import {
  Button,
  Col,
  IconButton,
  Row,
  TextField,
} from '@folio/stripes/components';

class ContributorForm extends Component {
  static propTypes = {
    onChangeField: PropTypes.func.isRequired,
  };

  addFields = (fields) => {
    fields.push('');
  }

  removeFields = (fields, index) => {
    fields.remove(index);
    this.props.onChangeField();
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={12}>
              <div>
                <em>
                  <FormattedMessage id="ui-orders.itemDetails.addContributor" />
                </em>
              </div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button
            data-test-add-contributor-button
            onClick={() => this.addFields(fields)}
          >
            <FormattedMessage id="ui-orders.itemDetails.addContributorBtn" />
          </Button>
        </Col>
      </Row>
    );
  }

  renderSubForm = (elem, index, fields) => {
    return (
      <Row key={index}>
        <Col xs={11}>
          <Field
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.itemDetails.contributor" />}
            name={`${elem}.contributor`}
            onChange={(e, value) => this.props.onChangeField(value, `${elem}.contributor`)}
          />
        </Col>
        <Col
          style={{ paddingTop: '10px' }}
          xs={1}
        >
          <br />
          <IconButton
            data-test-remove-contributor-button
            icon="trash"
            onClick={() => this.removeFields(fields, index)}
          >
            {<FormattedMessage id="ui-orders.itemDetails.removeBtn" />}
          </IconButton>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <FieldArray
        component={this.renderForm}
        label="contributors"
        name="contributors"
      />
    );
  }
}

export default ContributorForm;
