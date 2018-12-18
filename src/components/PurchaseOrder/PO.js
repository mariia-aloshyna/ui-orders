import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  ExpandAllButton,
  Icon,
  IconButton,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';

import {
  LayerPO,
  LayerPOLine,
} from '../LayerCollection';
import transitionToParams from '../Utils/transitionToParams';
import { CloseOrderModal } from './CloseOrder';
import { AdjustmentView } from './Adjustment';
import LineListing from './LineListing';
import { PODetailsView } from './PODetails';
import { SummaryView } from './Summary';

class PO extends Component {
  static manifest = Object.freeze({
    order: {
      type: 'okapi',
      path: 'orders/:{id}',
    },
    poLine: {
      type: 'okapi',
      path: 'orders/:{id}/lines',
      fetch: false,
    },
  })

  static propTypes = {
    initialValues: PropTypes.object,
    mutator: PropTypes.shape({
      poLine: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
    }).isRequired,
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
    resources: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        purchaseOrder: true,
        POSummary: true,
        POListing: true,
      },
    };
    this.onAddPOLine = this.onAddPOLine.bind(this);
    this.transitionToParams = transitionToParams.bind(this);
  }

  updateVendor(data) {
    this.props.parentMutator.vendor.update({ vendorID: data });
  }

  updateUser(data) {
    this.props.parentMutator.user.update({ userID: data });
  }

  onToggleSection = ({ id }) => {
    this.setState(({ sections }) => {
      const isSectionOpened = sections[id];

      return {
        sections: {
          ...sections,
          [id]: !isSectionOpened,
        },
      };
    });
  }

  handleExpandAll = (sections) => {
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
    const { location, history, match, mutator, resources, parentResources } = this.props;
    const initialValues = get(resources, ['order', 'records', 0]);
    const poLines = get(initialValues, 'po_lines', []);
    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="purchase_order.item.put">
          <CloseOrderModal
            orderId={get(initialValues, 'id')}
            workflowStatus={get(initialValues, 'workflow_status')}
          />
          <FormattedMessage id="ui-orders.paneMenu.editOrder">
            {ariaLabel => (
              <IconButton
                ariaLabel={ariaLabel}
                icon="edit"
                style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
                onClick={this.props.onEdit}
                href={this.props.editLink}
              />
            )}
          </FormattedMessage>
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

    const vendor = get(parentResources, 'vendors.records', []).find(d => d.id === initialValues.vendor);
    const assignedTo = get(parentResources, 'users.records', []).find(d => d.id === initialValues.assigned_to);
    const createdBy = get(parentResources, 'users.records', []).find(d => d.id === initialValues.created_by);

    initialValues.vendor_name = get(vendor, 'name');
    initialValues.assigned_to_user = assignedTo && assignedTo.personal
      ? `${assignedTo.personal.firstName} ${assignedTo.personal.lastName}`
      : '';
    initialValues.created_by_name = createdBy && createdBy.personal
      ? `${createdBy.personal.firstName} ${createdBy.personal.lastName}`
      : '';

    return (
      <Pane
        id="pane-podetails"
        defaultWidth="fill"
        paneTitle={'Purchase Order ID: ' + get(initialValues, ['id'], '')}
        lastMenu={lastMenu}
        dismissible
        onClose={this.props.onClose}
      >
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
            label={<FormattedMessage id="ui-orders.paneBlock.POLines" />}
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
          lineMutator={mutator.poLine}
          getInitialValues={initialValues}
          location={location}
          onBacktoEdit={this.onBacktoEdit}
          stripes={this.props.stripes}
          onCancel={this.props.onCloseEdit}
          history={history}
          match={match}
          parentResources={this.props.parentResources}
          parentMutator={this.props.parentMutator}
          order={initialValues}
        />
      </Pane>
    );
  }
}

export default PO;
