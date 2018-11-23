import React, { Component } from 'react';
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
  Datepicker,
  IconButton,
  Row,
  TextField,
} from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';
import FieldOrderType from './FieldOrderType';
import NotesForm from '../../NotesForm';
import { required } from '../../Utils/Validate';

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
            readOnly
          />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
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
            readOnly
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={TextField}
            fullWidth
            id="po_number"
            label={<FormattedMessage id="ui-orders.orderDetails.poNumber" />}
            name="po_number"
            validate={required}
          />
        </Col>
        <Col xs={6} md={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            dateFormat="YYYY-MM-DD"
            fullWidth
            id="created"
            label={<FormattedMessage id="ui-orders.orderDetails.createdOn" />}
            name="created"
            timeZone="UTC"
            validate={required}
          />
        </Col>
        <Col xs={6} md={3} style={{ display: 'none' }}>
          <p>This is hidden</p>
          <Field
            component={TextField}
            fullWidth
            id="vendor"
            name="vendor"
            readOnly
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
            readOnly
          />
          <div style={{ marginLeft: '10px', top: '2px', position: 'relative' }}>
            {this.userModal()}
          </div>
        </Col>
        <Col xs={6} md={3}>
          <Field
            component={Checkbox}
            fullWidth
            label={<FormattedMessage id="ui-orders.orderDetails.manualPO" />}
            name="manual_po"
            type="checkbox"
          />
        </Col>
        <Col xs={6} md={3}>
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
