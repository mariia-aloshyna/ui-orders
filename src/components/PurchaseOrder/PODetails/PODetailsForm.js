import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import _ from 'lodash';
import { TextField, Row, Col, Datepicker, Pluggable } from '@folio/stripes-components';
import TextFieldIcon from '@folio/stripes-components/lib/TextField/TextFieldIcon';
import { Required } from '../../Utils/Validate';

class PODetailsForm extends Component {
  static propTypes = {
    showPaneUsers: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.onClearFieldVendor = this.onClearFieldVendor.bind(this);
    this.onClearFieldUser = this.onClearFieldUser.bind(this);
  }

  onClearFieldVendor() {
    const { dispatch, change } = this.props;
    dispatch(change('vendor', ''));
    dispatch(change('vendor_name', ''));
  }

  onClearFieldUser() {
    const { dispatch, change } = this.props;
    dispatch(change('assigned_to_user', ''));
    dispatch(change('assigned_to', ''));
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
        dataKey={undefined}
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
        dataKey={undefined}
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
        <Col xs={6} md={3} style={{ display: 'none' }}>;
          <Field label="Created By" name="created_by" id="created_by" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3}>
          <Field label="Created By" name="created_by_name" id="created_by_name" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Field label="Assigned To Name" name="assigned_to_user" id="assigned_to_user" component={TextField} fullWidth readOnly />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
            {this.userModal()}
          </div>
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <Field label="Assigned To" name="assigned_to" id="assigned_to" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <Field label="Vendor" name="vendor" id="vendor" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Field label="Vendor name" name="vendor_name" id="vendor_name" component={TextField} fullWidth readOnly />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
            {this.userVendor()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default PODetailsForm;
