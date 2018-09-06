import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon, IconButton, AccordionSet, Accordion, ExpandAllButton, Pane, PaneMenu, Row, Col, Button, IfPermission } from '@folio/stripes-components';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
// import FundDistribution from './FundDistribution';
import LineListing from './LineListing';
import { PODetailsView } from './PODetails';
import { SummaryView } from './Summary';
import { LayerPO, LayerPOLine } from '../LayerCollection';

class PO extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dropdown: PropTypes.object,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
    editLink: PropTypes.string,
    paneWidth: PropTypes.string.isRequired
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, parentResources, match: { params: { id } } } = props;
    const po = (parentResources.records || {}).records || [];
    const initialValues = (po || po.length > 0 || id) ? po.find(u => u.id === id) : false;
    // Set initialValues
    if (initialValues) {
      if (!_.isEqual(initialValues, state.initialValues)) {
        return { initialValues };
      }
    }
    // Check if initialValues STATE before updating child;
    if (!_.isEmpty(state.initialValues)) {
      const vendor = (parentResources.vendor || {}).records || [];
      const user = (parentResources.user || {}).records || [];
      if ((vendor || vendor.length > 0) || (user || user.length > 0)) {
        const initData = state.initialValues;
        const vendorName = vendor[0] && vendor[0].name ? `${vendor[0].name}` : '';
        const assignToName = user[0] && user[0].personal ? `${user[0].personal.firstName} ${user[0].personal.lastName}` : '';
        if (vendorName !== initData.vendor_name || assignToName !== initData.assigned_to_user) {
          parentMutator.queryII.update({
            vendorID: initData.vendor,
            userID: initData.assigned_to
          });
          initData.vendor_name = vendorName;
          initData.assigned_to_user = assignToName;
          return { initialValues: initData };
        }
      }
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        purchaseOrder: true,
        POSummary: true,
        POListing: true
      },
      initialValues: {}
    };
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.onAddPOLine = this.onAddPOLine.bind(this);
    this.transitionToParams = transitionToParams.bind(this);
  }

  updateVendor(data) {
    this.props.parentMutator.vendor.update({ vendorID: data });
  }

  updateUser(data) {
    this.props.parentMutator.user.update({ userID: data });
  }

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const po = (parentResources.records || {}).records || [];
    if (!po || po.length === 0 || !id) return null;
    return po.find(u => u.id === id);
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

  openReceiveItem = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'receive-items' });
  }

  openReceived = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'received' });
  }

  onAddPOLine = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'create-po-line' });
  }

  onBacktoEdit = async (e) => {
    if (e) e.preventDefault();
    await this.transitionToParams({ layer: null });
    await this.transitionToParams({ layer: 'edit' });
    return false;
  }

  render() {
    const { location, history, match } = this.props;
    const initialValues = this.state.initialValues || {};
    const lastMenu = (<PaneMenu>
      <IfPermission perm="vendor.item.put">
        <IconButton
          icon="edit"
          id="clickable-editvendor"
          style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
          onClick={this.props.onEdit}
          href={this.props.editLink}
          title="Edit Vendor"
        />
      </IfPermission> </PaneMenu>);
    const addPOLineButton = (<Button onClick={this.onAddPOLine}>Add PO Line</Button>);

    if (!initialValues) {
      return (
        <Pane id="pane-podetails" defaultWidth="fill" paneTitle="Details" lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane id="pane-podetails" defaultWidth="fill" paneTitle={'Purchase Order ID: ' + _.get(initialValues, ['id'], '')} lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
        {/* <FundDistribution openReceiveItem={this.openReceiveItem} openReceived={this.openReceived} /> */}
        <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label="Purchase Order" id="purchaseOrder">
            <PODetailsView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="PO Summary" id="POSummary">
            <SummaryView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="PO Listing" id="POListing" displayWhenOpen={addPOLineButton}>
            <LineListing initialValues={initialValues} {...this.props} />
          </Accordion>
        </AccordionSet>
        <LayerPO
          initialValues={initialValues}
          location={location}
          onBacktoEdit={this.onBacktoEdit}
          stripes={this.props.stripes}
          onCancel={this.props.onCloseEdit}
          history={history}
          match={match}
          parentResources={this.props.parentResources}
          parentMutator={this.props.parentMutator}
          // States
          vendorName={this.state.vendorName}
          assignToName={this.state.assignToName}
        />
        <LayerPOLine
          getInitialValues={initialValues}
          location={location}
          onBacktoEdit={this.onBacktoEdit}
          stripes={this.props.stripes}
          onCancel={this.props.onCloseEdit}
          history={history}
          match={match}
          parentResources={this.props.parentResources}
          parentMutator={this.props.parentMutator}
        />
      </Pane>
    );
  }
}

export default PO;
