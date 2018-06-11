import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import stripesForm from '@folio/stripes-form';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import Layer from '@folio/stripes-components/lib/Layer';
import { LineDetailsForm } from '../LineDetails';
import { CostForm } from '../Cost';
import { ClaimForm } from '../Claim';
import { FundForm } from '../Fund';
import { TagForm } from '../Tags';
import { LocationForm } from '../Location';
import { VendorForm } from '../Vendor';
import { EresourcesForm } from '../Eresources';
import { ItemForm } from '../Item';
import { PhysicalForm } from '../Physical';
import { RenewalForm } from '../Renewal';
import { AdjustmentsForm } from '../Adjustments';
import { LicenseForm } from '../License';

class POLineForm extends Component {
  static propTypes = {
    // initialValues: PropTypes.object,
    // handleSubmit: PropTypes.func.isRequired,
    // onSave: PropTypes.func,
    // onCancel: PropTypes.func,
    // onRemove: PropTypes.func,
    // pristine: PropTypes.bool,
    // submitting: PropTypes.bool,
    // parentResources: PropTypes.object,
    // parentMutator: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        LineDetails: false,
        Cost: false,
        Fund: false,
        Claim: false,
        Tags: false,
        Locations: false,
        Vendor: true,
        Eresources: true,
        Item: true,
        Physical: true,
        Renewal: true,
        Adjustments: true,
        License: true
      }
    };
    this.deletePO = this.deletePO.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button id="clickable-closenewvendordialog" onClick={onCancel} title="close" aria-label="Close New Vendor Dialog">
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, handleSubmit } = this.props;
    return (
      <PaneMenu>
        <Button
          id={id}
          type="submit"
          title={label}
          disabled={pristine || submitting}
          onClick={handleSubmit}
          style={{ marginBottom: '0' }}
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !curState.sections[id];
      return newState;
    });
  }

  handleExpandAll(obj) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = obj;
      return newState;
    });
  }

  deletePO(ID) {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: '/vendor',
        layer: null
      });
    });
  }

  render() {
    const { initialValues, location, onCancel } = this.props;
    const query = location.search ? queryString.parse(location.search) : {};
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? <span>Edit: {_.get(initialValues, ['name'], '')} </span> : 'Create Order';
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-updatePoLine', 'Update PO Line') :
      this.getLastMenu('clickable-createnewPoLine', 'Create PO Line');
    const showDeleteButton = initialValues.id || false;

    if (!initialValues) {
      return (
        <Pane id="pane-podetails" defaultWidth="fill" paneTitle="Details" fistMenu={firstMenu} lastMenu={lastMenu} dismissible>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane id="pane-poLineForm" defaultWidth="fill" paneTitle={paneTitle} lastMenu={lastMenu} onClose={onCancel} dismissible>
        <form id="form-po">
          <Row>
            <Col xs={12}>
              <Row center="xs">
                <Col xs={12} md={8}>
                  <Row end="xs">
                    <Col xs={12}>
                      <ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={8} style={{ textAlign: 'left' }}>
                  <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
                    <Accordion label="PO Line Details" id="LineDetails">
                      <LineDetailsForm {...this.props} />
                    </Accordion>
                    <Accordion label="Cost" id="Cost">
                      <CostForm {...this.props} />
                    </Accordion>
                    <Accordion label="Fund Distribution" id="Fund">
                      <FundForm {...this.props} />
                      <br />
                    </Accordion>
                    <Accordion label="Claim" id="Claim">
                      <ClaimForm {...this.props} />
                      <br />
                    </Accordion>
                    <Accordion label="Po Line Tags" id="Tags">
                      <TagForm {...this.props} />
                    </Accordion>
                    <Accordion label="Locations" id="Locations">
                      <LocationForm {...this.props} />
                      <br />
                    </Accordion>
                    <Accordion label="Vendor" id="Vendor">
                      <VendorForm {...this.props} />
                    </Accordion>
                    <Accordion label="Item Details" id="Item">
                      <ItemForm {...this.props} />
                    </Accordion>
                    <Accordion label="E-resources Details" id="Eresources">
                      <EresourcesForm {...this.props} />
                    </Accordion>
                    <Accordion label="Physical Record Details" id="Physical">
                      <PhysicalForm {...this.props} />
                    </Accordion>
                    <Accordion label="Renewals" id="Renewal">
                      <RenewalForm {...this.props} />
                    </Accordion>
                    <Accordion label="Adjustments" id="Adjustments">
                      <AdjustmentsForm {...this.props} />
                    </Accordion>
                    <Accordion label="License" id="License">
                      <LicenseForm {...this.props} />
                    </Accordion>
                  </AccordionSet>
                  <IfPermission perm="vendor.item.delete">
                    <Row end="xs">
                      <Col xs={12}>
                        {
                          showDeleteButton &&
                          <Button type="button" buttonStyle="danger" onClick={() => { this.deleteVendor(this.props.initialValues.id); }}>Remove</Button>
                        }
                      </Col>
                    </Row>
                  </IfPermission>
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </Pane>
    );
  }
}

export default stripesForm({
  form: 'FormPO',
  navigationCheck: true,
  enableReinitialize: true,
})(POLineForm);

