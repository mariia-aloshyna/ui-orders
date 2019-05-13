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
  Selection,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import NotesForm from '../../NotesForm';
import { required } from '../../Utils/Validate';
import FolioFormattedTime from '../../FolioFormattedTime';
import FieldOrderType from './FieldOrderType';
import { addEmptyOption } from '../util';

import css from './PODetailsForm.css';

const OWNER_OPTIONS = [
  { value: '', label: 'No owner' },
  { value: 'Team 1', label: 'Team 1' },
  { value: 'Team 2', label: 'Team 2' },
  { value: 'Team 3', label: 'Team 3' },
];

class PODetailsForm extends Component {
  static propTypes = {
    generatedNumber: PropTypes.string,
    orderNumberSetting: PropTypes.object.isRequired,
    formValues: PropTypes.object,
    stripes: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
    owner: PropTypes.string,
  }

  onClearFieldUser = () => {
    const { dispatch, change } = this.props;

    dispatch(change('assignedToUser', ''));
    dispatch(change('assignedTo', null));
  }

  onClearFieldVendor = () => {
    const { dispatch, change } = this.props;

    dispatch(change('vendor', ''));
    dispatch(change('vendorName', ''));
  }

  onAddUser = (user) => {
    const { dispatch, change } = this.props;

    dispatch(change('assignedToUser', `${user.personal.firstName} ${user.personal.lastName}`));
    dispatch(change('assignedTo', `${user.id}`));
  }

  onAddVendor = (vendor) => {
    const { dispatch, change } = this.props;

    dispatch(change('vendorName', `${vendor.name}`));
    dispatch(change('vendor', `${vendor.id}`));
  }

  userClearButton = () => {
    const { formValues } = this.props;
    const isValues = formValues.assignedTo || formValues.assignedToUser;

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
    const isValues = formValues.vendorName || formValues.vendor;

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
        type="find-organization"
        dataKey="vendor"
        searchLabel="+"
        searchButtonStyle="default"
        selectVendor={this.onAddVendor}
        visibleColumns={['name', 'status']}
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
      owner,
    } = this.props;
    const isExistingOrder = Boolean(get(formValues, 'id'));
    const ownerOptions = owner && !OWNER_OPTIONS.some(({ value }) => value === owner)
      ? [...OWNER_OPTIONS, { value: owner, label: owner }]
      : OWNER_OPTIONS;

    return (
      <Fragment>
        <Row>
          <Col xs={4}>
            <Field
              component={Select}
              label={<FormattedMessage id="ui-orders.orderDetails.orderNumberPrefix" />}
              name="numberPrefix"
              dataOptions={addEmptyOption(selectedPrefixes)}
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
              dataOptions={addEmptyOption(selectedSuffixes)}
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
              label={<FormattedMessage id="ui-orders.orderDetails.vendor" />}
              name="vendorName"
              required
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
              label={<FormattedMessage id="ui-orders.orderDetails.createdBy" />}
              name="createdByName"
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
              label={<FormattedMessage id="ui-orders.orderDetails.assignedTo" />}
              name="assignedToUser"
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
              name="manualPo"
              type="checkbox"
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
              name="reEncumber"
              type="checkbox"
            />
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.orderDetails.billTo" />}
              name="billTo"
            />
          </Col>
          <Col
            xs={6}
            lg={3}
          >
            <Field
              component={TextField}
              fullWidth
              label={<FormattedMessage id="ui-orders.orderDetails.shipTo" />}
              name="shipTo"
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
          <Col
            xs={6}
            lg={3}
          >
            <Field
              component={Selection}
              dataOptions={ownerOptions}
              fullWidth
              label={<FormattedMessage id="ui-orders.poLine.owner" />}
              name="owner"
            />
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
