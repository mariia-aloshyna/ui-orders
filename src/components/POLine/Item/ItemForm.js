import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

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
import ProductIdDetailsForm from './ProductIdDetailsForm';
import ContributorForm from './ContributorForm';

import css from './ItemForm.css';

class ItemForm extends Component {
  static propTypes = {
    stripes: PropTypes.object.isRequired,
    parentResources: PropTypes.shape({
      materialTypes: PropTypes.object.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  onAddInstance = (instance) => {
    const { dispatch, change } = this.props;
    const { contributors, editions, publication, title } = instance;

    dispatch(change('title', title));
    if (publication && publication.length) {
      const { publisher, dateOfPublication } = publication[0];

      dispatch(change('publisher', publisher));
      dispatch(change('publicationDate', dateOfPublication));
    }
    if (editions && editions.length) {
      const edition = editions[0];

      dispatch(change('edition', edition));
    }
    if (contributors && contributors.length) {
      const lineContributors = contributors.map(({ name, contributorNameTypeId }) => ({
        contributor: name,
        contributorType: contributorNameTypeId,
      }));

      dispatch(change('contributors', lineContributors));
    }
  }

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
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <div className={css.titleWrapper}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.title" />}
              name="title"
              required
              validate={Required}
            />
            <div className={css.addButton}>
              {this.selectInstanceModal()}
            </div>
          </div>
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
          <ContributorForm />
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
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.itemDetails.publisher" />}
            name="publisher"
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
            validate={validateYear}
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
            component={TextField}
            fullWidth
            label={<FormattedMessage id="ui-orders.itemDetails.edition" />}
            name="edition"
          />
        </Col>
        <Col xs={12}>
          <ProductIdDetailsForm />
        </Col>
        <Col xs={12}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-orders.itemDetails.description" />}
            name="description"
          />
        </Col>
      </Row>
    );
  }
}

export default ItemForm;
