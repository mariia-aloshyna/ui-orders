import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { TextField, Row, Col, Datepicker, Pluggable, IconButton } from '@folio/stripes-components';
import { Required } from '../../Utils/Validate';

class PODetailsForm extends Component {
  static propTypes = {
    showPaneUsers: PropTypes.func,
  }

  static getDerivedStateFromProps(props, state) {
    const { dispatch, change } = props;
    if (props.vendorName !== state.vendorName || props.assignToName !== state.assignToName) {
      dispatch(change('assigned_to_user', props.assignToName));
      dispatch(change('vendor_name', props.vendorName));
      return {
        vendorName: props.vendorName,
        assignToName: props.assignToName
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
    dispatch(change('vendor_id', ''));
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
    dispatch(change('vendor_id', `${vendor.id}`));
  }

  userClearButton() {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormPO')(store.getState());
    const isValues = formValues.assigned_to || formValues.assigned_to_user;
    if (isValues && isValues.length > 0) {
      return (<IconButton onClick={this.onClearFieldUser} icon="clearX" size="small" />);
    }
    return null;
  }

  vendorClearButton() {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormPO')(store.getState());
    const isValues = formValues.vendor_name || formValues.vendor;
    if (isValues && isValues.length > 0) {
      return (<IconButton onClick={this.onClearFieldVendor} icon="clearX" size="small" />);
    }
    return null;
  }

  userModal() {
    const disableRecordCreation = true;
    const columnMapping = {
      name: 'name',
      patronGroup: 'patronGroup',
      username: 'username',
      barcode: 'barcode',
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
        disableRecordCreation={disableRecordCreation}
        {...this.props}
      >
        <span>[no user-selection plugin]</span>
      </Pluggable>
    );
  }

  userVendor() {
    const disableRecordCreation = true;
    const columnMapping = {
      name: 'name',
      patronGroup: 'patronGroup',
      username: 'username',
      barcode: 'barcode',
    };
    return (
      <Pluggable
        aria-haspopup="true"
        type="find-vendor"
        dataKey="vendor"
        searchLabel="+"
        searchButtonStyle="default"
        selectVendor={vendor => this.onAddVendor(vendor)}
        visibleColumns={['name', 'patronGroup', 'username', 'barcode']}
        columnMapping={columnMapping}
        disableRecordCreation={disableRecordCreation}
        {...this.props}
      >
        <span>[no vendor-selection plugin]</span>
      </Pluggable>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={6} md={3}>
          <Field label="PO Number" name="po_number" id="po_number" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created On" name="created" id="created" dateFormat="YYYY-MM-DD" timeZone="UTC" backendDateStandard="YYYY-MM-DD" component={Datepicker} fullWidth />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created By" name="created_by_name" id="created_by_name" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field label="Created By" name="created_by" id="created_by" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Field label="Assigned To Name" name="assigned_to_user" id="assigned_to_user" component={TextField} endControl={this.userClearButton()} fullWidth readOnly />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
            {this.userModal()}
          </div>
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field label="Assigned To" name="assigned_to" id="assigned_to" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field label="Vendor" name="vendor" id="vendor" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Field label="Vendor name" name="vendor_name" id="vendor_name" component={TextField} endControl={this.vendorClearButton()} fullWidth readOnly />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
            {this.userVendor()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default PODetailsForm;
