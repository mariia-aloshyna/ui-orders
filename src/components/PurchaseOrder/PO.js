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
import {
  LINES_API,
  ORDER_DETAIL_API,
} from '../Utils/api';
import transitionToParams from '../Utils/transitionToParams';
import { updateOrderResource } from '../Utils/orderResource';
import { MODULE_ORDERS } from '../Utils/const';
import { ORDER_TYPE } from './PODetails/FieldOrderType';
import CloseOrderModal from './CloseOrder';
import { WORKFLOW_STATUS } from './Summary/FieldWorkflowStatus';
import { AdjustmentView } from './Adjustment';
import LineListing from './LineListing';
import { PODetailsView } from './PODetails';
import { SummaryView } from './Summary';
import { RenewalsView } from './renewals';

class PO extends Component {
  static manifest = Object.freeze({
    order: {
      type: 'okapi',
      path: ORDER_DETAIL_API,
    },
    poLine: {
      type: 'okapi',
      path: LINES_API,
      fetch: false,
      throwErrors: false,
    },
    closingReasons: {
      type: 'okapi',
      records: 'configs',
      path: 'configurations/entries',
      GET: {
        params: {
          query: `(module=${MODULE_ORDERS} and configName=closing-reasons)`,
        },
      },
    },
  })

  static propTypes = {
    mutator: PropTypes.shape({
      order: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
      }),
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
    onCancel: PropTypes.func,
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
        renewals: true,
      },
      isCloseOrderModalOpened: false,
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

  closeOrder = (reason, note) => {
    const { mutator, resources } = this.props;
    const order = get(resources, ['order', 'records', 0]);
    const closeOrderProps = {
      workflow_status: WORKFLOW_STATUS.closed,
      close_reason: {
        reason,
        note,
      },
    };

    updateOrderResource(order, mutator.order, closeOrderProps);
    this.unmountModal();
  }

  addPOLineButton = (
    <Button
      data-test-add-line-button
      onClick={this.onAddPOLine}
    >
      <FormattedMessage id="ui-orders.button.addLine" />
    </Button>
  );

  mountModal = () => {
    this.setState({ isCloseOrderModalOpened: true });
  }

  unmountModal = () => {
    this.setState({ isCloseOrderModalOpened: false });
  }

  render() {
    const { location, history, match, mutator, resources, parentResources } = this.props;
    const order = get(resources, ['order', 'records', 0]);
    const orderId = get(order, 'id');
    const orderNumber = get(order, 'po_number', '');
    const poLines = get(order, 'po_lines', []);
    const workflowStatus = get(order, 'workflow_status');
    const isCloseOrderButtonVisible = orderId && workflowStatus === WORKFLOW_STATUS.open;
    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="purchase_order.item.put">
          {isCloseOrderButtonVisible && (
            <Button
              buttonStyle="primary"
              marginBottom0
              onClick={this.mountModal}
              style={{ marginRight: '10px' }}
            >
              <FormattedMessage id="ui-orders.paneBlock.closeBtn" />
            </Button>
          )}
          {this.state.isCloseOrderModalOpened && (
            <CloseOrderModal
              cancel={this.unmountModal}
              closeOrder={this.closeOrder}
              closingReasons={resources.closingReasons.records}
              orderNumber={orderNumber}
            />
          )}
          <FormattedMessage id="ui-orders.paneMenu.editOrder">
            {ariaLabel => (
              <IconButton
                ariaLabel={ariaLabel}
                icon="edit"
                style={{ visibility: !order ? 'hidden' : 'visible' }}
                onClick={this.props.onEdit}
                href={this.props.editLink}
              />
            )}
          </FormattedMessage>
        </IfPermission>
      </PaneMenu>
    );

    if (!order) {
      return (
        <Pane
          defaultWidth="fill"
          dismissible
          id="pane-podetails"
          lastMenu={lastMenu}
          onClose={this.props.onClose}
          paneTitle={<FormattedMessage id="ui-orders.order.paneTitle.detailsLoading" />}
        >
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    const vendor = get(parentResources, 'vendors.records', []).find(d => d.id === order.vendor);
    const assignedTo = get(parentResources, 'users.records', []).find(d => d.id === order.assigned_to);
    const createdByUserId = get(order, 'metadata.createdByUserId');
    const createdBy = get(parentResources, 'users.records', []).find(d => d.id === createdByUserId);
    const isOngoing = get(order, 'order_type') === ORDER_TYPE.ongoing;

    order.vendor_name = get(vendor, 'name');
    order.assigned_to_user = assignedTo && assignedTo.personal
      ? `${assignedTo.personal.firstName} ${assignedTo.personal.lastName}`
      : '';
    order.created_by_name = createdBy && createdBy.personal
      ? `${createdBy.personal.firstName} ${createdBy.personal.lastName}`
      : '';

    return (
      <Pane
        data-test-order-details
        defaultWidth="fill"
        paneTitle={<FormattedMessage id="ui-orders.order.paneTitle.details" values={{ orderNumber }} />}
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
            <PODetailsView order={order} {...this.props} />
          </Accordion>
          {isOngoing && (
            <Accordion
              id="renewals"
              label={<FormattedMessage id="ui-orders.paneBlock.renewals" />}
            >
              <RenewalsView order={order} />
            </Accordion>
          )}
          <Accordion
            id="POSummary"
            label={<FormattedMessage id="ui-orders.paneBlock.POSummary" />}
          >
            <SummaryView order={order} {...this.props} />
          </Accordion>
          <Accordion
            displayWhenOpen={this.addPOLineButton}
            id="POListing"
            label={<FormattedMessage id="ui-orders.paneBlock.POLines" />}
          >
            <LineListing poLines={poLines} {...this.props} />
          </Accordion>
          <Accordion
            id="Adjustment"
            label={<FormattedMessage id="ui-orders.paneBlock.adjustment" />}
          >
            <AdjustmentView order={order} {...this.props} />
          </Accordion>
        </AccordionSet>
        <LayerPO
          order={order}
          location={location}
          stripes={this.props.stripes}
          onCancel={this.props.onCloseEdit}
          history={history}
          match={match}
          parentResources={this.props.parentResources}
          parentMutator={this.props.parentMutator}
        />
        <LayerPOLine  // used for new Line form
          lineMutator={mutator.poLine}
          location={location}
          stripes={this.props.stripes}
          onCancel={this.props.onCloseEdit}
          history={history}
          match={match}
          parentResources={this.props.parentResources}
          parentMutator={this.props.parentMutator}
          order={order}
        />
      </Pane>
    );
  }
}

export default PO;
