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

import {
  isCheckInAvailableForLine,
  isReceiveAvailableForLine,
} from '../PurchaseOrder/util';

import LocationView from './Location/LocationView';
import { POLineDetails } from './POLineDetails';
import CostView from './Cost/CostView';
import VendorView from './Vendor/VendorView';
import FundDistributionView from './FundDistribution/FundDistributionView';
import EresourcesView from './Eresources/EresourcesView';
import ItemView from './Item/ItemView';
import PhysicalView from './Physical/PhysicalView';
import { OtherView } from './Other';
import {
  ACCORDION_ID,
  ERESOURCES,
  PHRESOURCES,
  OTHER,
} from './const';

class POLineView extends Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    poURL: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.object),
    order: PropTypes.object,
    line: PropTypes.object,
    materialTypes: PropTypes.arrayOf(PropTypes.object),
    vendors: PropTypes.arrayOf(PropTypes.object),
    funds: PropTypes.arrayOf(PropTypes.object),
    receivingURL: PropTypes.string.isRequired,
    checkinURL: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    editable: PropTypes.bool,
  }

  static defaultProps = {
    locations: [],
    materialTypes: [],
    vendors: [],
    funds: [],
    editable: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        CostDetails: false,
        Vendor: false,
        FundDistribution: false,
        ItemDetails: true,
        Renewal: false,
        [ACCORDION_ID.eresources]: false,
        [ACCORDION_ID.location]: false,
        [ACCORDION_ID.other]: false,
        [ACCORDION_ID.physical]: false,
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

  onEditPOLine = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'edit-po-line' });
  }

  render() {
    const {
      onClose,
      poURL,
      receivingURL,
      checkinURL,
      order,
      line,
      materialTypes,
      locations,
      vendors,
      funds,
      editable,
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
          {
            editable && (
              <IconButton
                icon="edit"
                id="clickable-edit-po-line"
                onClick={this.onEditPOLine}
                title="Edit PO Line"
              />
            )
          }
        </IfPermission>
      </PaneMenu>
    );

    if (!(line && order)) {
      return (
        <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" lastMenu={lastMenu} dismissible>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    const orderFormat = get(line, 'orderFormat');
    const showEresources = ERESOURCES.includes(orderFormat);
    const showPhresources = PHRESOURCES.includes(orderFormat);
    const showOther = orderFormat === OTHER;
    const isReceiveButtonVisible = isReceiveAvailableForLine(line, order);
    const isCheckInButtonVisible = isCheckInAvailableForLine(line, order);

    return (
      <Pane
        defaultWidth="fill"
        firstMenu={poURL ? firstMenu : null}
        dismissible={Boolean(onClose)}
        onClose={onClose}
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
                  to={receivingURL}
                >
                  <FormattedMessage id="ui-orders.paneBlock.receiveBtn" />
                </Button>
              </div>
            )}
            {isCheckInButtonVisible && (
              <div>
                <Button
                  buttonStyle="primary"
                  data-test-line-check-in-button
                  to={checkinURL}
                >
                  <FormattedMessage id="ui-orders.paneBlock.checkInBtn" />
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <AccordionSet
          accordionStatus={this.state.sections}
          onToggle={this.onToggleSection}
        >
          <Accordion
            label={<FormattedMessage id="ui-orders.line.accordion.itemDetails" />}
            id="ItemDetails"
          >
            <ItemView poLineDetails={line} />
          </Accordion>
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
          <Accordion
            label={<FormattedMessage id="ui-orders.line.accordion.cost" />}
            id="CostDetails"
          >
            <CostView
              cost={line.cost}
              {...this.props}
            />
          </Accordion>
          <Accordion
            label={<FormattedMessage id="ui-orders.line.accordion.vendor" />}
            id="Vendor"
          >
            <VendorView
              vendorDetail={line.vendorDetail}
              {...this.props}
            />
          </Accordion>
          <Accordion
            label={<FormattedMessage id="ui-orders.line.accordion.fund" />}
            id="FundDistribution"
          >
            <FundDistributionView
              line={line}
              funds={funds}
            />
          </Accordion>
          {showEresources && (
            <Accordion
              label={<FormattedMessage id="ui-orders.line.accordion.eresource" />}
              id={ACCORDION_ID.eresources}
            >
              <EresourcesView
                line={line}
                materialTypes={materialTypes}
                order={order}
                vendors={vendors}
              />
            </Accordion>
          )}
          {showPhresources && (
            <Accordion
              label={<FormattedMessage id="ui-orders.line.accordion.physical" />}
              id={ACCORDION_ID.physical}
            >
              <PhysicalView
                materialTypes={materialTypes}
                physical={get(line, 'physical', {})}
                vendors={vendors}
              />
            </Accordion>
          )}
          {showOther && (
            <Accordion
              label={<FormattedMessage id="ui-orders.line.accordion.other" />}
              id={ACCORDION_ID.other}
            >
              <OtherView
                materialTypes={materialTypes}
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
              lineLocations={line.locations}
              locations={locations}
            />
          </Accordion>
        </AccordionSet>
      </Pane>
    );
  }
}

export default POLineView;
