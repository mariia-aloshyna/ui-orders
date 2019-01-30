import React, { Component, Fragment } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
} from 'redux-form';

import {
  Checkbox,
  Col,
  IconButton,
  KeyValue,
  Row,
  TextField,
  Select,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import NotesForm from '../../NotesForm';
import { required } from '../../Utils/Validate';
import FolioFormattedTime from '../../FolioFormattedTime';
import FieldOrderType from './FieldOrderType';
import css from './PODetailsForm.css';

class PODetailsForm extends Component {
  static propTypes = {
    generatedNumber: PropTypes.string,
    orderNumberSetting: PropTypes.object.isRequired,
    formValues: PropTypes.object,
    stripes: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
  }

  onClearFieldUser = () => {
    const { dispatch, change } = this.props;

    dispatch(change('assigned_to_user', ''));
    dispatch(change('assigned_to', null));
  }

  onClearFieldVendor = () => {
    const { dispatch, change } = this.props;

    dispatch(change('vendor', ''));
    dispatch(change('vendor_name', ''));
  }

  onAddUser = (user) => {
    const { dispatch, change } = this.props;

    dispatch(change('assigned_to_user', `${user.personal.firstName} ${user.personal.lastName}`));
    dispatch(change('assigned_to', `${user.id}`));
  }

  onAddVendor = (vendor) => {
    const { dispatch, change } = this.props;

    dispatch(change('vendor_name', `${vendor.name}`));
    dispatch(change('vendor', `${vendor.id}`));
  }

  userClearButton = () => {
    const { formValues } = this.props;
    const isValues = formValues.assigned_to || formValues.assigned_to_user;

    if (isValues && isValues.length > 0) {
      return (
        <IconButton
          onClick={this.onClearFieldUser}
          icon="times-circle-solid"
          size="small"
        />
      );
    }

    return null;
  }

  vendorClearButton = () => {
    const { formValues } = this.props;
    const isValues = formValues.vendor_name || formValues.vendor;

    if (isValues && isValues.length > 0) {
      return (
        <IconButton
          onClick={this.onClearFieldVendor}
          icon="times-circle-solid"
          size="small"
        />
      );
    }

    return null;
  }

  userModal = () => {
    const columnMapping = {
      name: <FormattedMessage id="ui-orders.user.name" />,
      patronGroup: <FormattedMessage id="ui-orders.user.patronGroup" />,
      username: <FormattedMessage id="ui-orders.user.username" />,
      barcode: <FormattedMessage id="ui-orders.user.barcode" />,
    };
    const { stripes } = this.props;

    return (
      <Pluggable
        aria-haspopup="true"
        type="find-user"
        dataKey="user"
        searchLabel="+"
        searchButtonStyle="default"
        selectUser={this.onAddUser}
        visibleColumns={['name', 'patronGroup', 'username', 'barcode']}
        columnMapping={columnMapping}
        disableRecordCreation
        stripes={stripes}
      >
        <span>[no user-selection plugin]</span>
      </Pluggable>
    );
  }

  userVendor = () => {
    const columnMapping = {
      name: <FormattedMessage id="ui-orders.vendor.name" />,
      vendor_status: <FormattedMessage id="ui-orders.vendor.vendor_status" />,
    };
    const { stripes } = this.props;

    return (
      <Pluggable
        aria-haspopup="true"
        type="find-vendor"
        dataKey="vendor"
        searchLabel="+"
        searchButtonStyle="default"
        selectVendor={this.onAddVendor}
        visibleColumns={['name', 'vendor_status']}
        columnMapping={columnMapping}
        disableRecordCreation
        stripes={stripes}
      >
        <span>[no vendor-selection plugin]</span>
      </Pluggable>
    );
  }

  fillBackGeneratedNumber = (e, value) => {
    const { change, dispatch, generatedNumber } = this.props;

    if (value === '') {
      // setTimeout is required due to async nature of redux-form CHANGE field value event.
      window.setTimeout(() => dispatch(change('poNumber', generatedNumber)));
    }
  }

  render() {
    const {
      formValues,
      orderNumberSetting: { selectedPrefixes, selectedSuffixes, canUserEditOrderNumber },
    } = this.props;
    const isExistingOrder = Boolean(get(formValues, 'id'));

    return (
      <Fragment>
        <Row>
          <Col xs={4}>
            <Field
              component={Select}
              label={<FormattedMessage id="ui-orders.orderDetails.orderNumberPrefix" />}
              name="numberPrefix"
              placeholder=" "
              dataOptions={selectedPrefixes}
              disabled={isExistingOrder}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.orderDetails.poNumber" />}
              name="poNumber"
              disabled={!canUserEditOrderNumber}
              onBlur={this.fillBackGeneratedNumber}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Select}
              label={<FormattedMessage id="ui-orders.orderDetails.orderNumberSuffix" />}
              name="numberSuffix"
              placeholder=" "
              dataOptions={selectedSuffixes}
              disabled={isExistingOrder}
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            lg={3}
            className={css.pluginFieldWrapper}
          >
            <Field
              component={TextField}
              disabled
              endControl={this.vendorClearButton()}
              fullWidth
              hasClearIcon={false}
              id="vendor_name"
              label={<FormattedMessage id="ui-orders.orderDetails.vendor" />}
              name="vendor_name"
              validate={required}
            />
            <div className={css.pluginButtonWrapper}>
              {this.userVendor()}
            </div>
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <Field
              component={TextField}
              fullWidth
              id="created_by_name"
              label={<FormattedMessage id="ui-orders.orderDetails.createdBy" />}
              name="created_by_name"
              disabled
            />
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <KeyValue label={<FormattedMessage id="ui-orders.orderDetails.createdOn" />}>
              <FolioFormattedTime dateString={get(formValues, 'metadata.createdDate')} />
            </KeyValue>
          </Col>
          <Col
            xs={12}
            lg={3}
            className={css.pluginFieldWrapper}
          >
            <Field
              component={TextField}
              disabled
              endControl={this.userClearButton()}
              fullWidth
              hasClearIcon={false}
              id="assigned_to_user"
              label={<FormattedMessage id="ui-orders.orderDetails.assignedTo" />}
              name="assigned_to_user"
            />
            <div className={css.pluginButtonWrapper}>
              {this.userModal()}
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            xs={6}
            lg={3}
          >
            <br />
            <Field
              component={Checkbox}
              fullWidth
              label={<FormattedMessage id="ui-orders.orderDetails.manualPO" />}
              name="manual_po"
            />
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <br />
            <Field
              component={Checkbox}
              fullWidth
              label={<FormattedMessage id="ui-orders.orderDetails.re_encumber" />}
              name="re_encumber"
            />
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <Field
              component={TextField}
              fullWidth
              id="bill_to"
              label={<FormattedMessage id="ui-orders.orderDetails.billTo" />}
              name="bill_to"
            />
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <Field
              component={TextField}
              fullWidth
              id="ship_to"
              label={<FormattedMessage id="ui-orders.orderDetails.shipTo" />}
              name="ship_to"
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={6}
            lg={3}
          >
            <FieldOrderType />
          </Col>
        </Row>
        <Row>
          <FieldArray
            name="notes"
            component={NotesForm}
          />
        </Row>
      </Fragment>
    );
  }
}

export default PODetailsForm;
