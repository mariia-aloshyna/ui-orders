import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { cloneDeep, get } from 'lodash';
import stripesForm from '@folio/stripes/form';
import { Paneset, Pane, PaneMenu, Button, Row, Icon, Col, IfPermission, AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes/components';
import { PODetailsForm } from './PODetails';
import { SummaryForm } from './Summary';
import { AdjustmentForm } from './Adjustment';

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
        Adjustment: true,
      }
    };
    this.deletePO = this.deletePO.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button type="button" id="clickable-close-new-purchase-order-dialog" onClick={onCancel} title="close" aria-label="Close New Purchase Order Dialog">
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }}>&times;</span>
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
      const newState = cloneDeep(curState);
      newState.sections[id] = !curState.sections[id];
      return newState;
    });
  }

  handleExpandAll(obj) {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
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

  render() {
    const { initialValues, onCancel } = this.props;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? (
      <span>
        {`Edit: ${get(initialValues, ['id'], '')}`}
      </span>
    ) : <FormattedMessage id="ui-orders.paneMenu.createPurchaseOrder" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-update-purchase-order', <FormattedMessage id="ui-orders.paneMenu.updateOrder" />) :
      this.getLastMenu('clickable-create-new-purchase-order', <FormattedMessage id="ui-orders.paneMenu.createPurchaseOrder" />);
    const showDeleteButton = initialValues.id || false;

    if (!initialValues) {
      return (
        <Pane
          defaultWidth="fill"
          firstMenu={firstMenu}
          id="pane-podetails"
          lastMenu={lastMenu}
          onClose={onCancel}
          paneTitle={<FormattedMessage id="ui-orders.paneTitle.details" />}
        >
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <div style={{ height: '100vh' }}>
        <Paneset>
          <Pane
            defaultWidth="100%"
            firstMenu={firstMenu}
            id="pane-poForm"
            lastMenu={lastMenu}
            onClose={onCancel}
            paneTitle={paneTitle}
          >
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
                        <Accordion
                          id="purchaseOrder"
                          label={<FormattedMessage id="ui-orders.paneBlock.purchaseOrder" />}
                        >
                          <PODetailsForm showPaneVendors={this.showPaneVendors} showPaneUsers={this.showPaneUsers} {...this.props} />
                        </Accordion>
                        <Accordion
                          id="POSummary"
                          label={<FormattedMessage id="ui-orders.paneBlock.POSummary" />}
                        >
                          <SummaryForm {...this.props} />
                        </Accordion>
                        <Accordion
                          id="Adjustment"
                          label={<FormattedMessage id="ui-orders.paneBlock.adjustment" />}
                        >
                          <AdjustmentForm {...this.props} />
                        </Accordion>
                      </AccordionSet>
                      <IfPermission perm="purchase_order.item.delete">
                        <Row end="xs">
                          <Col xs={12}>
                            {
                              showDeleteButton &&
                              <Button
                                type="button"
                                buttonStyle="danger"
                                onClick={() => { this.deletePO(this.props.initialValues.id); }}
                              >
                                <FormattedMessage id="ui-orders.button.remove" />
                              </Button>
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
