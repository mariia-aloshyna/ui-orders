import React, { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  FieldArray,
  getFormValues,
} from 'redux-form';

import {
  Checkbox,
  Col,
  IconButton,
  KeyValue,
  Row,
  TextField,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

import FieldOrderType from './FieldOrderType';
import NotesForm from '../../NotesForm';
import { required } from '../../Utils/Validate';
import FolioFormattedTime from '../../FolioFormattedTime';

class PODetailsForm extends Component {
  static propTypes = {
    showPaneUsers: PropTypes.func,
    stripes: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
  }

  static getDerivedStateFromProps(props, { assignToName, createdByName, vendorName }) {
    const { dispatch, change } = props;
    const isDataChanged = props.vendorName !== vendorName || props.assignToName !== assignToName || props.createdByName !== createdByName;

    if (isDataChanged) {
      dispatch(change('created_by_name', props.createdByName));
      dispatch(change('assigned_to_user', props.assignToName));
      dispatch(change('vendor_name', props.vendorName));

      return {
        createdByName: props.createdByName,
        vendorName: props.vendorName,
        assignToName: props.assignToName,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onClearFieldVendor = this.onClearFieldVendor.bind(this);
    this.onClearFieldUser = this.onClearFieldUser.bind(this);
  }

  onClearFieldUser() {
    const { dispatch, change } = this.props;

    dispatch(change('assigned_to_user', ''));
    dispatch(change('assigned_to', ''));
  }

  onClearFieldVendor() {
    const { dispatch, change } = this.props;

    dispatch(change('vendor', ''));
    dispatch(change('vendor_name', ''));
  }

  onAddUser(user) {
    const { dispatch, change } = this.props;

    dispatch(change('assigned_to_user', `${user.personal.firstName} ${user.personal.lastName}`));
    dispatch(change('assigned_to', `${user.id}`));
  }

  onAddVendor(vendor) {
    const { dispatch, change } = this.props;

    dispatch(change('vendor_name', `${vendor.name}`));
    dispatch(change('vendor', `${vendor.id}`));
  }

  userClearButton() {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormPO')(store.getState());
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

  vendorClearButton() {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormPO')(store.getState());
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

  userModal() {
    const columnMapping = {
      name: <FormattedMessage id="ui-orders.user.name" />,
      patronGroup: <FormattedMessage id="ui-orders.user.patronGroup" />,
      username: <FormattedMessage id="ui-orders.user.username" />,
      barcode: <FormattedMessage id="ui-orders.user.barcode" />,
    };

    return (
      <Pluggable
        aria-haspopup="true"
        type="find-user"
        dataKey="user"
        searchLabel="+"
        searchButtonStyle="default"
        selectUser={user => this.onAddUser(user)}
        visibleColumns={['name', 'patronGroup', 'username', 'barcode']}
        columnMapping={columnMapping}
        disableRecordCreation
        {...this.props}
      >
        <span>[no user-selection plugin]</span>
      </Pluggable>
    );
  }

  userVendor() {
    const columnMapping = {
      name: <FormattedMessage id="ui-orders.vendor.name" />,
      vendor_status: <FormattedMessage id="ui-orders.vendor.vendor_status" />,
    };

    return (
      <Pluggable
        aria-haspopup="true"
        type="find-vendor"
        dataKey="vendor"
        searchLabel="+"
        searchButtonStyle="default"
        selectVendor={vendor => this.onAddVendor(vendor)}
        visibleColumns={['name', 'vendor_status']}
        columnMapping={columnMapping}
        disableRecordCreation
        {...this.props}
      >
        <span>[no vendor-selection plugin]</span>
      </Pluggable>
    );
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Row>
        <Col
          xs={6}
          md={3}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
        >
          <Field
            component={TextField}
            endControl={this.vendorClearButton()}
            fullWidth
            id="vendor_name"
            label={<FormattedMessage id="ui-orders.orderDetails.vendor" />}
            name="vendor_name"
            disabled
            validate={required}
          />
          <div style={{ marginLeft: '10px', top: '0', position: 'relative' }}>
            {this.userVendor()}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="created_by_name"
            label={<FormattedMessage id="ui-orders.orderDetails.createdBy" />}
            name="created_by_name"
            disabled
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="po_number"
            label={<FormattedMessage id="ui-orders.orderDetails.poNumber" />}
            name="po_number"
            disabled
          />
        </Col>
        <Col xs={6} md={3}>
          <KeyValue label={<FormattedMessage id="ui-orders.orderDetails.createdOn" />}>
            <FolioFormattedTime dateString={get(initialValues, 'created')} />
          </KeyValue>
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field
            component={TextField}
            fullWidth
            id="vendor"
            name="vendor"
          />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field
            component={TextField}
            fullWidth
            id="created_by"
            name="created_by"
            readOnly
          />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field
            component={TextField}
            fullWidth
            id="assigned_to"
            name="assigned_to"
            readOnly
          />
        </Col>
        <Col xs={6} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Field
            component={TextField}
            endControl={this.userClearButton()}
            fullWidth
            id="assigned_to_user"
            label={<FormattedMessage id="ui-orders.orderDetails.assignedTo" />}
            name="assigned_to_user"
            disabled
          />
          <div style={{ marginLeft: '10px', top: '0', position: 'relative' }}>
            {this.userModal()}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <br />
          <Field
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.orderDetails.manualPO" />}
            name="manual_po"
            type="checkbox"
          />
        </Col>
        <Col xs={6} md={3}>
          <br />
          <Field
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.orderDetails.re_encumber" />}
            name="re_encumber"
            type="checkbox"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="bill_to"
            label={<FormattedMessage id="ui-orders.orderDetails.billTo" />}
            name="bill_to"
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="ship_to"
            label={<FormattedMessage id="ui-orders.orderDetails.shipTo" />}
            name="ship_to"
          />
        </Col>
        <Col xs={6} md={3}>
          <FieldOrderType />
        </Col>
        <Col xs={12}>
          <FieldArray
            name="notes"
            component={NotesForm}
          />
        </Col>
      </Row>
    );
  }
}

export default PODetailsForm;
