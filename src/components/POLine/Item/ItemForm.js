import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
} from 'redux-form';

import {
  find,
  get,
} from 'lodash';

import {
  Col,
  Datepicker,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import {
  DATE_FORMAT,
  TIMEZONE,
} from '../../Utils/const';
import {
  Required,
  validateYear,
} from '../../Utils/Validate';
import ContributorForm from './ContributorForm';
import ProductIdDetailsForm from './ProductIdDetailsForm';
import InstancePlugin from './InstancePlugin';
import {
  checkInstanceIdField,
  getInventoryData,
} from './util';
import { isWorkflowStatusOpen } from '../../PurchaseOrder/util';

import css from './ItemForm.css';
import { ALLOWED_YEAR_LENGTH } from '../const';
import { FieldSelection } from "@folio/stripes-acq-components";

class ItemForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    identifierTypes: PropTypes.arrayOf(PropTypes.object),
    contributorsNameTypes: PropTypes.arrayOf(PropTypes.object),
    initialValues: PropTypes.object,
    order: PropTypes.object.isRequired,
    formValues: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      publisher: '',
      publicationDate: '',
      edition: '',
      contributors: [],
      productIds: [],
    };
  }

  onAddInstance = (instance) => {
    const { dispatch, change, identifierTypes } = this.props;
    const { contributors, editions, publication, title, identifiers, id } = instance;
    const inventoryData = { instanceId: id };

    dispatch(change('instanceId', id));
    if (title) {
      dispatch(change('title', title));
      inventoryData.title = title;
    }
    if (publication && publication.length) {
      const { publisher, dateOfPublication = '' } = publication[0];

      dispatch(change('publisher', publisher));
      inventoryData.publisher = publisher;

      if (dateOfPublication.length === ALLOWED_YEAR_LENGTH) {
        dispatch(change('publicationDate', dateOfPublication));
        inventoryData.publicationDate = dateOfPublication;
      }
    }
    if (editions && editions.length) {
      const edition = editions[0];

      dispatch(change('edition', edition));
      inventoryData.edition = edition;
    }
    if (contributors && contributors.length) {
      const lineContributors = contributors.map(({ name, contributorNameTypeId }) => ({
        contributor: name,
        contributorNameTypeId,
      }));

      dispatch(change('contributors', lineContributors));
      inventoryData.contributors = lineContributors;
    }
    if (identifiers && identifiers.length) {
      const lineidentifiers = identifiers.map(({ identifierTypeId, value }) => ({
        productId: value,
        productIdType: find(identifierTypes, { value: identifierTypeId }).value,
      }));

      dispatch(change('details.productIds', lineidentifiers));
      inventoryData.productIds = lineidentifiers;
    }
    this.setState(({
      instanceId: inventoryData.instanceId,
      title: get(inventoryData, 'title', ''),
      publisher: get(inventoryData, 'publisher', ''),
      publicationDate: get(inventoryData, 'publicationDate', ''),
      edition: get(inventoryData, 'edition', ''),
      contributors: get(inventoryData, 'contributors', []),
      productIds: get(inventoryData, 'productIds', []),
    }));
  };

  onChangeField = (value, fieldName) => {
    const { formValues, dispatch, change, initialValues } = this.props;
    const inventoryData = getInventoryData(this.state, initialValues);

    dispatch(change(fieldName, value));

    this.updateContributor();

    if (checkInstanceIdField(formValues, inventoryData)) {
      dispatch(change('instanceId', inventoryData.instanceId));
    } else dispatch(change('instanceId', null));
  };

  updateContributor = () => {
    const { formValues, dispatch, change } = this.props;
    const contributors = get(formValues, 'contributors', []);
    const contributorNameTypeId = get(contributors, [0, 'contributorNameTypeId']);

    dispatch(change('contributors', contributors.filter(item => !!item.contributorNameTypeId).map(contributor => ({
      ...contributor,
      contributorNameTypeId,
    }))));
  };

  selectInstanceModal = (isDisabled) => {
    if (isDisabled) return false;

    return <InstancePlugin addInstance={this.onAddInstance} />;
  };

  render() {
    const isOpenedOrder = isWorkflowStatusOpen(this.props.order);

    const { contributorsNameTypes, formValues } = this.props;
    const contributors = get(formValues, 'contributors', []);

    return (
      <Fragment>
        <Row start="xs">
          <Col xs={12}>
            <div className={css.titleWrapper}>
              <Field
                component={TextField}
                fullWidth
                label={<FormattedMessage id="ui-orders.itemDetails.title" />}
                name="title"
                onChange={(e, value) => this.onChangeField(value, 'title')}
                required
                validate={Required}
                disabled={isOpenedOrder}
              />
              <div className={css.addButton}>
                {this.selectInstanceModal(isOpenedOrder)}
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.instanceId" />}
              name="instanceId"
              readOnly
            />
          </Col>
          <Col xs={12}>
            <Field
              component={TextArea}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.receivingNote" />}
              name="details.receivingNote"
            />
          </Col>
          <Col xs={6}>
            <Field
              dataOptions={contributorsNameTypes}
              component={FieldSelection}
              fullWidth
              required={contributors.length > 0}
              label={<FormattedMessage id="ui-orders.itemDetails.contributor" />}
              name="contributors[0].contributorNameTypeId"
              validate={Required}
            />
          </Col>
          <Col xs={6}>
            <Field
              backendDateStandard={DATE_FORMAT}
              component={Datepicker}
              dateFormat={DATE_FORMAT}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionFrom" />}
              name="details.subscriptionFrom"
              timeZone={TIMEZONE}
            />
          </Col>
          <Col xs={6}>
            <Field
              backendDateStandard={DATE_FORMAT}
              component={Datepicker}
              dateFormat={DATE_FORMAT}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionTo" />}
              name="details.subscriptionTo"
              timeZone={TIMEZONE}
              disabled={isOpenedOrder}
            />
          </Col>
          <Col xs={6}>
            <Field
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionInterval" />}
              name="details.subscriptionInterval"
              component={TextField}
              type="number"
              fullWidth
              disabled={isOpenedOrder}
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.publicationDate" />}
              name="publicationDate"
              onChange={(e, value) => this.onChangeField(value, 'publicationDate')}
              normalize={v => (v || null)}
              validate={validateYear}
              disabled={isOpenedOrder}
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.publisher" />}
              name="publisher"
              onChange={(e, value) => this.onChangeField(value, 'publisher')}
              disabled={isOpenedOrder}
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.edition" />}
              onChange={(e, value) => this.onChangeField(value, 'edition')}
              name="edition"
              disabled={isOpenedOrder}
            />
          </Col>
          <Col xs={6}>
            <ContributorForm
              onChangeField={this.onChangeField}
              disabled={isOpenedOrder}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ProductIdDetailsForm
              identifierTypes={this.props.identifierTypes}
              onChangeField={this.onChangeField}
              disabled={isOpenedOrder}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={TextArea}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.description" />}
              name="description"
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default ItemForm;
