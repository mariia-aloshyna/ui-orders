import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Field,
  getFormValues,
} from 'redux-form';

import {
  find,
  get,
} from 'lodash';

import {
  Col,
  Datepicker,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

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
import {
  checkInstanceIdField,
  getInventoryData,
} from './util';

import css from './ItemForm.css';
import { ALLOWED_YEAR_LENGTH } from '../const';

class ItemForm extends Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    identifierTypes: PropTypes.arrayOf(PropTypes.object),
    initialValues: PropTypes.object,
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
        contributorType: contributorNameTypeId,
      }));

      dispatch(change('contributors', lineContributors));
      inventoryData.contributors = lineContributors;
    }
    if (identifiers && identifiers.length) {
      const lineidentifiers = identifiers.map(({ identifierTypeId, value }) => ({
        productId: value,
        productIdType: find(identifierTypes, { id: identifierTypeId }).value,
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
    const { dispatch, change, initialValues, stripes: { store } } = this.props;
    const inventoryData = getInventoryData(this.state, initialValues);

    dispatch(change(fieldName, value));

    const formValues = getFormValues('POLineForm')(store.getState());

    if (checkInstanceIdField(formValues, inventoryData)) {
      dispatch(change('instanceId', inventoryData.instanceId));
    } else dispatch(change('instanceId', null));
  };

  selectInstanceModal = () => {
    const { stripes } = this.props;
    const columnMapping = {
      title: <FormattedMessage id="ui-orders.instance.title" />,
      contributors: <FormattedMessage id="ui-orders.instance.contributors" />,
      publishers: <FormattedMessage id="ui-orders.instance.publishers" />,
    };

    return (
      <Pluggable
        aria-haspopup="true"
        columnMapping={columnMapping}
        dataKey="instances"
        disableRecordCreation
        searchButtonStyle="default"
        searchLabel="+"
        selectInstance={this.onAddInstance}
        stripes={stripes}
        type="find-instance"
        visibleColumns={['title', 'contributors', 'publishers']}
      >
        <span>[no instance-selection plugin]</span>
      </Pluggable>
    );
  };

  render() {
    return (
      <Fragment>
        <Row>
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
              />
              <div className={css.addButton}>
                {this.selectInstanceModal()}
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
            />
          </Col>
          <Col xs={6}>
            <Field
              label={<FormattedMessage id="ui-orders.itemDetails.subscriptionInterval" />}
              name="details.subscriptionInterval"
              component={TextField}
              type="number"
              fullWidth
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
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.publisher" />}
              name="publisher"
              onChange={(e, value) => this.onChangeField(value, 'publisher')}
            />
          </Col>
          <Col xs={6}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.edition" />}
              onChange={(e, value) => this.onChangeField(value, 'edition')}
              name="edition"
            />
          </Col>
          <Col xs={6}>
            <ContributorForm
              onChangeField={this.onChangeField}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ProductIdDetailsForm
              identifierTypes={this.props.identifierTypes}
              onChangeField={this.onChangeField}
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
