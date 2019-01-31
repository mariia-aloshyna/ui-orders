import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  getFormValues,
  isDirty,
} from 'redux-form';

import { IfPermission } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';
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
  Paneset,
  Row,
} from '@folio/stripes/components';

import getOrderNumberSetting from '../Utils/getOrderNumberSetting';
import { ORDER_TYPE } from './PODetails/FieldOrderType';
import { PODetailsForm } from './PODetails';
import { SummaryForm } from './Summary';
import { AdjustmentView } from './Adjustment';
import { RenewalsForm } from './renewals';

const throwError = () => {
  const errorInfo = { po_number: <FormattedMessage id="ui-orders.errors.orderNumberIsNotValid" /> };

  throw errorInfo;
};

const asyncValidate = (values, dispatchRedux, props) => {
  const { po_number: poNumber, numberPrefix = '', numberSuffix = '' } = values;
  const fullOrderNumber = `${numberPrefix}${poNumber}${numberSuffix}`.trim();
  const { parentMutator: { orderNumber: validator }, stripes: { store } } = props;
  const orderNumberFieldIsDirty = isDirty('FormPO')(store.getState(), ['po_number']);

  return orderNumberFieldIsDirty && poNumber
    ? validator.POST({ poNumber: fullOrderNumber })
      .catch(response => response.json()
        .catch(() => throwError())
        .then(() => throwError()))
    : Promise.resolve();
};

class POForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        purchaseOrder: true,
        POSummary: true,
        Adjustment: true,
        renewals: true,
      },
    };
    this.deletePO = this.deletePO.bind(this);
  }

  componentDidMount() {
    const { initialValues: { id }, change, dispatch, parentMutator } = this.props;

    parentMutator.orderNumber.reset();
    parentMutator.orderNumber.GET()
      .then(({ poNumber: orderNumber }) => {
        if (!id) {
          dispatch(change('po_number', orderNumber));
        }
      });
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-orders.buttons.line.close">
          {(title) => (
            <IconButton
              aria-label={<FormattedMessage id="ui-orders.buttons.orderForm.ariaCloseDialog" />}
              icon="times"
              id="clickable-close-new-purchase-order-dialog"
              onClick={onCancel}
              title={title}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, handleSubmit } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id={label}>
          {ariaLabel => (
            <Button
              id={id}
              type="submit"
              disabled={pristine || submitting}
              onClick={handleSubmit}
              style={{ marginBottom: '0', marginRight: '10px' }}
            >
              {ariaLabel}
            </Button>
          )}
        </FormattedMessage>

      </PaneMenu>
    );
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

  deletePO = () => {
    const { parentMutator, initialValues: { id } } = this.props;

    parentMutator.records.DELETE({ id }).then(() => {
      parentMutator.query.update({
        _path: '/orders',
        layer: null,
      });
    });
  }

  render() {
    const { change, dispatch, initialValues, onCancel, stripes, parentResources } = this.props;
    const { sections } = this.state;
    const generatedNumber = get(parentResources, 'orderNumber.records.0.poNumber');
    const formValues = getFormValues('FormPO')(stripes.store.getState());
    const isOngoing = formValues.order_type === ORDER_TYPE.ongoing;
    const firstMenu = this.getAddFirstMenu();
    const orderNumber = get(initialValues, 'po_number', '');
    const paneTitle = initialValues.id
      ? <FormattedMessage id="ui-orders.order.paneTitle.edit" values={{ orderNumber }} />
      : <FormattedMessage id="ui-orders.paneMenu.createPurchaseOrder" />;
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-update-purchase-order', 'ui-orders.paneMenu.updateOrder') :
      this.getLastMenu('clickable-create-new-purchase-order', 'ui-orders.paneMenu.createPurchaseOrder');
    const showDeleteButton = initialValues.id || false;
    const orderNumberSetting = getOrderNumberSetting(get(parentResources, 'orderNumberSetting.records', []));

    if (!initialValues) {
      return (
        <Pane
          defaultWidth="fill"
          firstMenu={firstMenu}
          id="pane-podetails"
          lastMenu={lastMenu}
          onClose={onCancel}
          paneTitle={<FormattedMessage id="ui-orders.order.paneTitle.detailsLoading" />}
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
            <form
              id="form-po"
              data-test-form-page
            >
              <Row>
                <Col xs={12}>
                  <Row center="xs">
                    <Col xs={12} md={8}>
                      <Row end="xs">
                        <Col xs={12}>
                          <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} md={8} style={{ textAlign: 'left' }}>
                      <AccordionSet accordionStatus={sections} onToggle={this.onToggleSection}>
                        <Accordion
                          id="purchaseOrder"
                          label={<FormattedMessage id="ui-orders.paneBlock.purchaseOrder" />}
                        >
                          <PODetailsForm
                            change={change}
                            dispatch={dispatch}
                            formValues={formValues}
                            generatedNumber={generatedNumber}
                            order={initialValues}
                            orderNumberSetting={orderNumberSetting}
                            stripes={stripes}
                          />
                        </Accordion>
                        {isOngoing && (
                          <Accordion
                            id="renewals"
                            label={<FormattedMessage id="ui-orders.paneBlock.renewals" />}
                          >
                            <RenewalsForm />
                          </Accordion>
                        )}
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
                          <AdjustmentView order={initialValues} />
                        </Accordion>
                      </AccordionSet>
                      <IfPermission perm="orders.item.delete">
                        <Row end="xs">
                          <Col xs={12}>
                            {
                              showDeleteButton &&
                              <Button
                                type="button"
                                buttonStyle="danger"
                                onClick={this.deletePO}
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
  asyncBlurFields: ['po_number'],
  asyncValidate,
  enableReinitialize: true,
  form: 'FormPO',
  navigationCheck: true,
})(POForm);
