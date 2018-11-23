import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray
} from 'redux-form';
import {
  Row,
  Col,
  Button,
  TextField,
  Select,
} from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

const PRODUCTIDTYPE = {
  ISBN: 'ISBN',
  ISSN: 'ISSN',
  ISMN: 'ISMN',
  EAN: 'EAN',
  otherStandartId: 'Other Standard Identifier',
  standartTechReport: 'Standard Technical Report Number',
  publisherNumber: 'Publisher Number',
  CODEN: 'CODEN',
  GPO: 'GPO Item Number',
  locallyId: 'Locally-defined identifiers',
  vendorTitle: 'Vendor Title Number',
  vendorItem: 'Vendor Item Number',
};

class ProductIdDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.addFields = this.addFields.bind(this);
    this.removeFields = this.removeFields.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  addFields(fields) {
    fields.push({});
  }

  removeFields(fields, index) {
    fields.remove(index);
  }

  renderForm({ fields }) {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={12}>
              <div>
                <em>
                  <FormattedMessage id="ui-orders.itemDetails.addProductId" />
                </em>
              </div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => this.addFields(fields)}>
            <FormattedMessage id="ui-orders.itemDetails.addProductIdBtn" />
          </Button>
        </Col>
      </Row>
    );
  }

  renderSubForm(elem, index, fields) {
    return (
      <Row key={index}>
        <Col xs={5}>
          <Field
            label={<FormattedMessage id="ui-orders.itemDetails.productId" />}
            name={`${elem}.product_id`}
            id={`${elem}.product_id`}
            component={TextField}
            fullWidth
          />
        </Col>
        <Col xs={5}>
          <Field
            label={<FormattedMessage id="ui-orders.itemDetails.productIdType" />}
            name={`${elem}.product_id_type`}
            id={`${elem}.product_id_type`}
            component={Select}
            validate={[Required]}
            fullWidth
          >
            <FormattedMessage id="ui-orders.dropdown.select">
              {(message) => <option value="">{message}</option>}
            </FormattedMessage>
            {Object.keys(PRODUCTIDTYPE).map((key) => (
              <FormattedMessage
                id={`ui-orders.itemDetails.productIdType.${key}`}
                key={key}
              >
                {(message) => <option value={PRODUCTIDTYPE[key]}>{message}</option>}
              </FormattedMessage>
            ))}
          </Field>
        </Col>
        <Col xs={2} style={{ paddingTop: '4px' }}>
          <br />
          <Button
            onClick={() => this.removeFields(fields, index)}
            buttonStyle="danger"
          >
            {<FormattedMessage id="ui-orders.itemDetails.removeBtn" />}
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <FieldArray
        label="details.product_ids"
        name="details.product_ids"
        id="details.product_ids"
        component={this.renderForm}
      />
    );
  }
}

export default ProductIdDetailsForm;
