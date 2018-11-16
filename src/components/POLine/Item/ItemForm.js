import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  Col,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import MaterialTypesForm from './MaterialTypesForm';
import ProductIdDetailsForm from './ProductIdDetailsForm';

class ItemForm extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col xs={12}>
            <Field
              label={<FormattedMessage id="ui-orders.itemDetails.receivingNote" />}
              name="receiving_note"
              id="receiving_note"
              component={TextArea}
              fullWidth
            />
          </Col>
          <Col xs={5}>
            <Field
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionFrom" />}
              name="subscription_from"
              id="subscription_from"
              component={TextField}
              fullWidth
            />
          </Col>
          <Col xs={5}>
            <Field
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionTo" />}
              name="subscription_to"
              id="subscription_to"
              component={TextField}
              fullWidth
            />
          </Col>
          <Col xs={2}>
            <Field
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionInterval" />}
              name="subscription_interval"
              id="subscription_interval"
              component={TextField}
              type="number"
              fullWidth
            />
          </Col>
        </Row>
        <MaterialTypesForm />
        <ProductIdDetailsForm />
      </Fragment>
    );
  }
}

export default ItemForm;
