import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import queryString from 'query-string';
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import FormatDate from '../../Utils/FormatDate';
import LineDetailsView from '../LineDetails/LineDetailsView';
import CostView from '../Cost/CostView';
import FundView from '../Fund/FundView';


class LineView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        Cost: true,
        POSummary: true,
        POListing: true
      }
    };
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
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
      <IfPermission perm="vendor.item.put">
        <IconButton
          icon="edit"
          id="clickable-editvendor"
          href={this.props.editLink}
          title="Edit Vendor"
        />
      </IfPermission> </PaneMenu>);

    const { location, initialValues } = this.props;

    // if (!initialValues) {
    //   return (
    //     <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" lastMenu={lastMenu} dismissible>
    //       <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
    //     </Pane>
    //   );
    // }

    return (
      <Pane id="pane-poLineDetails" defaultWidth="fill" paneTitle="PO Line Details" firstMenu={firstMenu} lastMenu={lastMenu}>
        <LineDetailsView initialValues={initialValues} {...this.props} />
        <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label="Cost" id="Cost">
            <CostView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Fund Distribution" id="Fund">
            <FundView initialValues={initialValues} {...this.props} />
          </Accordion>
        </AccordionSet>
        {/* <Layer isOpen={query.layer ? query.layer === 'edit' : false} label="Edit Vendor Dialog">
          <this.connectedPaneDetails
            stripes={this.props.stripes}
            initialValues={initialValues}
            onSubmit={(record) => { this.update(record); }}
            onCancel={this.props.onCloseEdit}
            parentResources={this.props.parentResources}
            parentMutator={this.props.parentMutator}
          />
        </Layer> */}
      </Pane>
    );
  }
}

export default LineView;
