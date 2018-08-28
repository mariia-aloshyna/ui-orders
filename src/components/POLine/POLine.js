import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Pane, PaneMenu, Icon, IconButton, IfPermission, Row, Col, AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import { POLineDetails } from './POLineDetails';
import CostView from './Cost/CostView';
import TagView from './Tags/TagView';
import LocationView from './Location/LocationView';
import VendorView from './Vendor/VendorView';
import EresourcesView from './Eresources/EresourcesView';
import ItemView from './Item/ItemView';
import PhysicalView from './Physical/PhysicalView';
import RenewalView from './Renewal/RenewalView';
import AdjustmentsView from './Adjustments/AdjustmentsView';
import LicenseView from './License/LicenseView';
import { LayerPOLine } from '../LayerCollection';

class POLine extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    editLink: PropTypes.object,
    parentResources: PropTypes.object,
    parentMutator: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        Cost: false,
        POSummary: false,
        POListing: false,
        Tags: false,
        Locations: false,
        Vendor: false,
        Eresources: false,
        Item: false,
        Physical: false,
        Renewal: false,
        Adjustments: false,
        License: false
      }
    };
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.transitionToParams = transitionToParams.bind(this);
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

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const poLine = (parentResources.poLine || {}).records || [];
    if (!poLine || poLine.length === 0 || !id) return null;
    return poLine.find(u => u.id === id);
  }

  onEditPOLine = (e) => {
    if (e) e.preventDefault();
    this.transitionToParams({ layer: 'edit-po-line' });
  }

  render() {
    const { poURL } = this.props;
    const firstMenu = (<PaneMenu>
      <IconButton
        icon="left-arrow"
        id="clickable-backToPO"
        href={`${poURL}`}
        title="Back to PO"
      />
    </PaneMenu>);
    const lastMenu = (<PaneMenu>
      <IfPermission perm="po_line.item.put">
        <IconButton
          icon="edit"
          id="clickable-edit-po-line"
          onClick={this.onEditPOLine}
          title="Edit PO Line"
        />
      </IfPermission> </PaneMenu>);
    const { location } = this.props;
    const initialValues = this.getData();

    if (!initialValues) {
      return (
        <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" lastMenu={lastMenu} dismissible>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" firstMenu={firstMenu} lastMenu={lastMenu}>
          <POLineDetails initialValues={initialValues} {...this.props} />
          <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
          <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
            <Accordion label="Cost" id="Cost">
              <CostView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="Po Line Tags" id="Tags">
              <TagView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="Locations" id="Locations">
              <LocationView initialValues={initialValues} {...this.props} />
              <br />
            </Accordion>
            <Accordion label="Vendor" id="Vendor">
              <VendorView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="Item Details" id="Item">
              <ItemView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="E-resources Details" id="Eresources">
              <EresourcesView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="Physical Record Details" id="Physical">
              <PhysicalView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="Renewals" id="Renewal">
              <RenewalView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="Adjustments" id="Adjustments">
              <AdjustmentsView initialValues={initialValues} {...this.props} />
            </Accordion>
            <Accordion label="License" id="License">
              <LicenseView initialValues={initialValues} {...this.props} />
            </Accordion>
          </AccordionSet>
          <LayerPOLine
            getInitialValues={initialValues}
            location={location}
            stripes={this.props.stripes}
            onCancel={this.props.onCloseEdit}
            parentResources={this.props.parentResources}
            parentMutator={this.props.parentMutator}
          />
        </Pane>
    );
  }
}

export default POLine;
