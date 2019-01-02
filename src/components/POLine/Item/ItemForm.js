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
import MaterialTypesForm from './MaterialTypesForm';
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

    dispatch(change('title', instance.title));
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
    const { parentResources } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <div className={css.titleWrapper}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.itemDetails.title" />}
              name="title"
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
            name="receiving_note"
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
            name="subscription_from"
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
            name="subscription_interval"
            component={TextField}
            type="number"
            fullWidth
          />
        </Col>
        <Col xs={6}>
          <Field
            backendDateStandard={DATE_FORMAT}
            component={Datepicker}
            dateFormat={DATE_FORMAT}
            fullWidth
            label={<FormattedMessage id="ui-orders.itemDetails.publicationDate" />}
            name="publication_date"
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
            name="subscription_to"
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
        <Col xs={6}>
          <MaterialTypesForm materialTypes={parentResources.materialTypes} />
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
