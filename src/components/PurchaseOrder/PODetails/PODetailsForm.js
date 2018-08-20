import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import _ from 'lodash';
import { Select, TextField, Row, Col, Datepicker, IconButton, Pluggable } from '@folio/stripes-components';
import TextFieldIcon from '@folio/stripes-components/lib/TextField/TextFieldIcon';
import { Required } from '../../Utils/Validate';

class PODetailsForm extends Component {
  static propTypes = {
    showPaneUsers: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.vendorAddButton = this.vendorAddButton.bind(this);
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

  vendorAddButton() {
    const { stripes: { store }, showPaneVendors } = this.props;
    const formValues = getFormValues('FormPO')(store.getState());
    const isValues = formValues.vendor_name || formValues.vendor;
    if (isValues && isValues.length > 0) {
      return (<IconButton onClick={this.onClearFieldVendor} icon="clearX" size="small" />);
    } else {
      return (<IconButton onClick={() => showPaneVendors(true)} icon="plus-sign" size="small" iconSize="small" />);
    }
  }

  onAdd(user) {
    console.log(user);
  }

  renderConfirmModal() {
    const columnMapping = {
      name: 'ui-users.information.name',
      patronGroup: 'ui-users.information.patronGroup',
      username: 'ui-users.information.username',
      barcode: 'ui-users.information.barcode',
    };
    // const modulename = Object.assign({ module: { displayName: 'arvind' } });
    return (
      <Pluggable
        aria-haspopup="true"
        type="find-user"
        dataKey={'name'}
        searchLabel="+"
        searchButtonStyle="default"
        selectUser={user => this.onAdd(user)}
        visibleColumns={['name', 'patronGroup', 'username', 'barcode']}
        columnMapping={columnMapping}
        disableRecordCreation={false}
        // {...modulename}
        {...this.props}
      >
        <span>[no user-selection plugin]</span>
      </Pluggable>
    );
  }

  render() {
    const vendorAddButton = this.vendorAddButton();
    return (
      <Row>
        <Col xs={6} md={4}>
          <Field label="PO Number" name="po_number" id="po_number" component={TextField} fullWidth />
        </Col>
        <Col xs={6} md={4}>
          <Field label="Created On" name="created" id="created" dateFormat="YYYY-MM-DD" timeZone="UTC" backendDateStandard="YYYY-MM-DD" component={Datepicker} fullWidth />
        </Col>
        <Col xs={6} md={4} style={{ display: 'none' }}>;
          <Field label="Created By" name="created_by" id="created_by" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={4}>
          <Field label="Created By" name="created_by_name" id="created_by_name" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={6} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Field label="Assigned To Name" name="assigned_to_user" id="assigned_to_user" component={TextField} fullWidth readOnly />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
            {this.renderConfirmModal()}
          </div>
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <Field label="Assigned To" name="assigned_to" id="assigned_to" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <Field label="Vendor" name="vendor" id="vendor" component={TextField} fullWidth readOnly />
        </Col>
        <Col xs={6} md={6}>
          <Field label="Vendor name" name="vendor_name" id="vendor_name" component={TextField} endControl={vendorAddButton} fullWidth readOnly />
        </Col>
      </Row>
    );
  }
}

export default PODetailsForm;
