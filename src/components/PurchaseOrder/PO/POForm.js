import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import stripesForm from '@folio/stripes-form';
import { Paneset, Pane, PaneMenu, Button, Row, Icon, Col, IfPermission, IconButton, AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components';
import { PODetailsForm } from '../PODetails';
import { SummaryForm } from '../Summary';

class POForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.object,
    parentMutator: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        purchaseOrder: true,
        POSummary: true,
      },
      showPaneUsers: false,
    };
    this.deletePO = this.deletePO.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
    this.showPaneUsers = this.showPaneUsers.bind(this);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button id="clickable-close-new-purchase-order-dialog" onClick={onCancel} title="close" aria-label="Close New Purchase Order Dialog">
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }

  firstMenuSecondPane() {
    return (
      <PaneMenu>
        <button id="clickable-close-users-pane" onClick={() => this.showPaneUsers(false)} title="close" aria-label="Close users Pane" style={{ marginBottom: '0', marginLeft: '10px' }}>
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
          style={{ marginBottom: '0', marginRight: '10px' }}
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
        _path: '/orders',
        layer: null
      });
    });
  }

  showPaneUsers(val) {
    this.setState({ showPaneUsers: val });
  }

  render() {
    const { initialValues, onCancel } = this.props;
    const firstMenu = this.getAddFirstMenu();
    const firstMenuSecondPane = this.firstMenuSecondPane();
    const paneTitle = initialValues.id ? <span>Edit: {_.get(initialValues.id, ['id'], '')} </span> : 'Create Order';
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-update-purchase-order', 'Update Order') :
      this.getLastMenu('clickable-create-new-purchase-order', 'Create Order');
    const showDeleteButton = initialValues.id || false;

    if (!initialValues) {
      return (
        <Pane id="pane-podetails" defaultWidth="fill" paneTitle="Details" fistMenu={firstMenu} onClose={onCancel} lastMenu={lastMenu} dismissible>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <div style={{ height: '100vh' }}>
        <Paneset>
          <Pane id="pane-poForm" defaultWidth="fill" paneTitle={paneTitle} fistMenu={firstMenu} onClose={onCancel} lastMenu={lastMenu} dismissible>
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
                        <Accordion label="Purchase Order" id="purchaseOrder">
                          <PODetailsForm showPaneUsers={this.showPaneUsers} {...this.props} />
                        </Accordion>
                        <Accordion label="PO Summary" id="POSummary">
                          <SummaryForm {...this.props} />
                        </Accordion>
                      </AccordionSet>
                      <IfPermission perm="purchase_order.item.delete">
                        <Row end="xs">
                          <Col xs={12}>
                            {
                              showDeleteButton &&
                              <Button type="button" buttonStyle="danger" onClick={() => { this.deletePO(this.props.initialValues.id); }}>Remove</Button>
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
          {
            this.state.showPaneUsers &&
            <Pane id="pane-users" defaultWidth="30%" paneTitle="Users" firstMenu={firstMenuSecondPane}>
              <p>Users Pane</p>
            </Pane>
          }
        </Paneset>
      </div>
    );
  }
}

export default stripesForm({
  form: 'FormPO',
  navigationCheck: true,
  enableReinitialize: true,
})(POForm);

