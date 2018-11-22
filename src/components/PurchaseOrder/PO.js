import React, { Component } from 'react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import { get, isEmpty, isEqual } from 'lodash';
import { Icon, IconButton, AccordionSet, Accordion, ExpandAllButton, Pane, PaneMenu, Row, Col, Button, IfPermission } from '@folio/stripes/components';
import transitionToParams from '../Utils/transitionToParams';
// import FundDistribution from './FundDistribution';
import { AdjustmentView } from './Adjustment';
import LineListing from './LineListing';
import { PODetailsView } from './PODetails';
import { SummaryView } from './Summary';
import { LayerPO, LayerPOLine } from '../LayerCollection';
import mockedOrders from '../Utils/mockedOrders';

class PO extends Component {
  static manifest = Object.freeze({
    order: {
      type: 'okapi',
      path: 'orders/:{id}',
      throwErrors: false,
    },
  })

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
    paneWidth: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    resources: PropTypes.object.isRequired
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { id } }, parentMutator, parentResources, resources } = props;
    const initialValues = get(resources, ['order', 'records', 0], mockedOrders[id]);

    // Set initialValues
    if (initialValues) {
      if (!isEqual(initialValues, state.initialValues)) {
        return { initialValues };
      }
    }
    // Check if initialValues STATE before updating child;
    if (!isEmpty(state.initialValues)) {
      const createdBy = get(parentResources, 'createdBy.records', []);
      const vendor = get(parentResources, 'vendor.records', []);
      const user = get(parentResources, 'user.records', []);
      const isAnyDataLoaded = vendor.length > 0 || user.length > 0 || createdBy.length > 0;

      if (isAnyDataLoaded) {
        const initData = state.initialValues;
        const vendorName = vendor[0] && vendor[0].name ? `${vendor[0].name}` : '';
        const assignToName = user[0] && user[0].personal ? `${user[0].personal.firstName} ${user[0].personal.lastName}` : '';
        const createdByPersonal = get(createdBy, '0.personal');
        const createdByName = createdByPersonal ? `${createdByPersonal.firstName} ${createdByPersonal.lastName}` : '';
        const isDataChanged = vendorName !== initData.vendor_name || assignToName !== initData.assigned_to_user || createdByName !== initData.created_by_name;

        if (isDataChanged) {
          parentMutator.queryII.update({
            createdByID: initData.created_by,
            vendorID: initData.vendor,
            userID: initData.assigned_to
          });
          initData.vendor_name = vendorName;
          initData.assigned_to_user = assignToName;
          initData.created_by_name = createdByName;

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

  onToggleSection({ id }) {
    this.setState(({ sections }) => {
      const isSectionOpened = sections[id];
      return {
        sections: {
          ...sections,
          [id]: !isSectionOpened,
        }
      };
    });
  }

  handleExpandAll(sections) {
    this.setState({ sections });
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
    const { location, history, match, intl } = this.props;
    const initialValues = this.state.initialValues || {};
    const poLines = get(initialValues, 'po_lines', []);
    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="vendor.item.put">
          <IconButton
            icon="edit"
            id="clickable-editvendor"
            style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
            onClick={this.props.onEdit}
            href={this.props.editLink}
            title={intl.formatMessage({ id: 'ui-orders.paneMenu.editVendor' })}
          />
        </IfPermission>
      </PaneMenu>
    );
    const addPOLineButton = (<Button onClick={this.onAddPOLine}>Add PO Line</Button>);

    if (!initialValues) {
      return (
        <Pane
          defaultWidth="fill"
          dismissible
          id="pane-podetails"
          lastMenu={lastMenu}
          onClose={this.props.onClose}
          paneTitle={<FormattedMessage id="ui-orders.paneTitle.details" />}
        >
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane
        id="pane-podetails"
        defaultWidth="fill"
        paneTitle={'Purchase Order ID: ' + get(initialValues, ['id'], '')}
        lastMenu={lastMenu}
        dismissible
        onClose={this.props.onClose}
      >
        {/* <FundDistribution openReceiveItem={this.openReceiveItem} openReceived={this.openReceived} /> */}
        <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion
            id="purchaseOrder"
            label={<FormattedMessage id="ui-orders.paneBlock.purchaseOrder" />}
          >
            <PODetailsView order={initialValues} {...this.props} />
          </Accordion>
          <Accordion
            id="POSummary"
            label={<FormattedMessage id="ui-orders.paneBlock.POSummary" />}
          >
            <SummaryView order={initialValues} {...this.props} />
          </Accordion>
          <Accordion
            displayWhenOpen={addPOLineButton}
            id="POListing"
            label={<FormattedMessage id="ui-orders.paneBlock.POListing" />}
          >
            <LineListing poLines={poLines} {...this.props} />
          </Accordion>
          <Accordion
            id="Adjustment"
            label={<FormattedMessage id="ui-orders.paneBlock.adjustment" />}
          >
            <AdjustmentView order={initialValues} {...this.props} />
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

export default injectIntl(PO);
