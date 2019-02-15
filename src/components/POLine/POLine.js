import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';

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
import transitionToParams from '@folio/stripes-components/util/transitionToParams';

import { isReceiveAvailableForLine } from '../PurchaseOrder/util';
import {
  ORDER_DETAIL_API,
} from '../Utils/api';
import {
  lineMutatorShape,
  orderRecordsMutatorShape,
} from '../Utils/mutators';
import LocationView from './Location/LocationView';
import { LayerPOLine } from '../LayerCollection';
import { POLineDetails } from './POLineDetails';
import CostView from './Cost/CostView';
import VendorView from './Vendor/VendorView';
import FundDistributionView from './FundDistribution/FundDistributionView';
import EresourcesView from './Eresources/EresourcesView';
import ItemView from './Item/ItemView';
import PhysicalView from './Physical/PhysicalView';
import {
  ACCORDION_ID,
  ERESOURCES,
  PHRESOURCES,
} from './const';

class POLine extends Component {
  static manifest = Object.freeze({
    order: {
      type: 'okapi',
      path: ORDER_DETAIL_API,
      throwErrors: false,
    },
  });

  static propTypes = {
    location: PropTypes.object,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    editLink: PropTypes.string,
    parentResources: PropTypes.object,
    parentMutator: PropTypes.shape({
      poLine: lineMutatorShape,
      records: orderRecordsMutatorShape,
    }),
    poURL: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        lineId: PropTypes.string,
      }),
    }).isRequired,
    resources: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        CostDetails: false,
        Vendor: false,
        FundDistribution: false,
        Eresources: false,
        ItemDetails: false,
        Physical: false,
        Renewal: false,
        [ACCORDION_ID.location]: false,
      },
    };
    this.transitionToParams = transitionToParams.bind(this);
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

  getData() {
    const { match: { params: { lineId } }, resources } = this.props;
    const lines = get(resources, ['order', 'records', 0, 'compositePoLines'], []);

    return lines.find(u => u.id === lineId);
  }

  onEditPOLine = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'edit-po-line' });
  }

  goToReceiving = () => {
    const { match: { params: { id, lineId } }, parentMutator: { query } } = this.props;

    query.update({
      _path: `/orders/view/${id}/po-line/view/${lineId}/receiving`,
      layer: null,
      sort: null,
    });
  }

  render() {
    const {
      location,
      match: { params: { lineId } },
      onCloseEdit,
      parentMutator,
      parentResources,
      poURL,
      resources,
      stripes,
    } = this.props;

    const firstMenu = (
      <PaneMenu>
        <IconButton
          icon="arrow-left"
          id="clickable-backToPO"
          href={`${poURL}`}
          title="Back to PO"
        />
      </PaneMenu>);
    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="orders.po-lines.item.put">
          <IconButton
            icon="edit"
            id="clickable-edit-po-line"
            onClick={this.onEditPOLine}
            title="Edit PO Line"
          />
        </IfPermission>
      </PaneMenu>
    );

    const order = get(resources, ['order', 'records', 0]);
    const lines = get(order, 'compositePoLines', []);
    const line = lines.find(u => u.id === lineId);

    if (!line) {
      return (
        <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" lastMenu={lastMenu} dismissible>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    const orderFormat = get(line, 'order_format');
    const showEresources = ERESOURCES.includes(orderFormat);
    const showPhresources = PHRESOURCES.includes(orderFormat);
    const vendors = get(parentResources, 'vendors.records', []);
    const isReceiveButtonVisible = isReceiveAvailableForLine(line, order);

    return (
      <Pane
        defaultWidth="fill"
        firstMenu={firstMenu}
        id="pane-poLineDetails"
        lastMenu={lastMenu}
        paneTitle="PO Line Details"
      >
        <Row end="xs">
          <Col xs>
            {isReceiveButtonVisible && (
              <div>
                <Button
                  buttonStyle="primary"
                  data-test-line-receive-button
                  onClick={this.goToReceiving}
                >
                  <FormattedMessage id="ui-orders.paneBlock.receiveBtn" />
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <POLineDetails
          initialValues={line}
          {...this.props}
        />
        <Row end="xs">
          <Col xs>
            <ExpandAllButton
              accordionStatus={this.state.sections}
              onToggle={this.handleExpandAll}
            />
          </Col>
        </Row>
        <AccordionSet
          accordionStatus={this.state.sections}
          onToggle={this.onToggleSection}
        >
          <Accordion
            label="Cost Details"
            id="CostDetails"
          >
            <CostView
              cost={line.cost}
              {...this.props}
            />
          </Accordion>
          <Accordion
            label="Vendor"
            id="Vendor"
          >
            <VendorView
              vendorDetail={line.vendor_detail}
              {...this.props}
            />
          </Accordion>
          <Accordion
            label="Fund Distribution"
            id="FundDistribution"
          >
            <FundDistributionView
              line={line}
              parentResources={parentResources}
            />
          </Accordion>
          <Accordion
            label="Item Details"
            id="ItemDetails"
          >
            <ItemView
              poLineDetails={line}
              {...this.props}
            />
          </Accordion>
          {showEresources && (
            <Accordion
              label="E-resources Details"
              id="Eresources"
            >
              <EresourcesView
                line={line}
                order={order}
                vendors={vendors}
              />
            </Accordion>
          )}
          {showPhresources && (
            <Accordion
              label="Physical Resource Details"
              id="Physical"
            >
              <PhysicalView
                physical={get(line, 'physical', {})}
                vendors={vendors}
              />
            </Accordion>
          )}
          <Accordion
            label={<FormattedMessage id="ui-orders.line.accordion.location" />}
            id={ACCORDION_ID.location}
          >
            <LocationView
              locations={line.locations}
              parentResources={parentResources}
            />
          </Accordion>
        </AccordionSet>
        <LayerPOLine
          line={line}
          location={location}
          stripes={stripes}
          onCancel={onCloseEdit}
          parentResources={parentResources}
          parentMutator={parentMutator}
          order={order}
        />
      </Pane>
    );
  }
}

export default POLine;
