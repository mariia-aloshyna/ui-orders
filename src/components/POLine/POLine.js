import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Icon,
  IconButton,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';

import transitionToParams from '../Utils/transitionToParams';
import {
  LINES_API,
  ORDER_DETAIL_API,
} from '../Utils/api';
import { LayerPOLine } from '../LayerCollection';
import { POLineDetails } from './POLineDetails';
import CostView from './Cost/CostView';
import VendorView from './Vendor/VendorView';
import FundDistributionView from './FundDistribution/FundDistributionView';
import EresourcesView from './Eresources/EresourcesView';
import ItemView from './Item/ItemView';
import PhysicalView from './Physical/PhysicalView';
import {
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
    poLine: {
      type: 'okapi',
      path: LINES_API,
      fetch: false,
    },
  });

  static propTypes = {
    location: PropTypes.object,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    editLink: PropTypes.string,
    parentResources: PropTypes.object,
    parentMutator: PropTypes.object,
    poURL: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        lineId: PropTypes.string,
      }),
    }).isRequired,
    resources: PropTypes.object.isRequired,
    mutator: PropTypes.shape({
      poLine: PropTypes.shape({
        DELETE: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
      }),
    }).isRequired,
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
    const lines = get(resources, ['order', 'records', 0, 'po_lines'], []);

    return lines.find(u => u.id === lineId);
  }

  onEditPOLine = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'edit-po-line' });
  }

  render() {
    const { poURL, mutator, parentResources } = this.props;
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
        <IfPermission perm="po_line.item.put">
          <IconButton
            icon="edit"
            id="clickable-edit-po-line"
            onClick={this.onEditPOLine}
            title="Edit PO Line"
          />
        </IfPermission>
      </PaneMenu>
    );
    const { location, match: { params: { lineId } }, resources } = this.props;
    const order = get(resources, ['order', 'records', 0]);
    const lines = get(order, 'po_lines', []);
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

    return (
      <Pane
        defaultWidth="fill"
        firstMenu={firstMenu}
        id="pane-poLineDetails"
        lastMenu={lastMenu}
        paneTitle="PO Line Details"
      >
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
              initialValues={line}
              {...this.props}
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
        </AccordionSet>
        <LayerPOLine
          lineMutator={mutator.poLine}
          line={line}
          location={location}
          stripes={this.props.stripes}
          onCancel={this.props.onCloseEdit}
          parentResources={this.props.parentResources}
          parentMutator={this.props.parentMutator}
          order={order}
        />
      </Pane>
    );
  }
}

export default POLine;
