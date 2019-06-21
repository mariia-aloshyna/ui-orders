import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pane,
  Layer,
  ExpandAllButton,
  Row,
  Col,
  AccordionSet,
  Accordion,
  PaneMenu,
  Button,
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import {
  ORDER_TEMPLATES_ACCORDION,
  ORDER_TEMPLATES_ACCORDION_TITLES,
} from '../constants';
import TemplateInformationForm from './TemplateInformationForm';
import PurchaseOrderInformationForm from './PurchaseOrderInformationForm';
import PurchaseOrderNotesForm from './PurchaseOrderNotesForm';

const titleCreate = <FormattedMessage id="ui-orders.settings.orderTemplates.editor.titleCreate" />;

class OrderTemplatesEditor extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  state = {
    sections: {
      [ORDER_TEMPLATES_ACCORDION.TEMPLATE_INFO]: true,
      [ORDER_TEMPLATES_ACCORDION.PO_INFO]: false,
      [ORDER_TEMPLATES_ACCORDION.PO_NOTES]: false,
      [ORDER_TEMPLATES_ACCORDION.PO_SUMMARY]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_ITEM_DETAILS]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_DETAILS]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_COST_DETAILS]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_VENDOR]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_FUND_DISTIBUTION]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_ERESOURCES]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_FRESOURCES]: false,
      [ORDER_TEMPLATES_ACCORDION.POL_LOCATION]: false,
    },
  };

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
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  getLastMenu() {
    const { pristine, submitting } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-orders.settings.orderTemplates.editor.save">
          {ariaLabel => (
            <Button
              id="save-order-template-button"
              type="submit"
              disabled={pristine || submitting}
              style={{ marginBottom: '0', marginRight: '10px' }}
            >
              {ariaLabel}
            </Button>
          )}
        </FormattedMessage>

      </PaneMenu>
    );
  }

  render() {
    const { handleSubmit, close } = this.props;
    const { sections } = this.state;

    return (
      <Layer isOpen>
        <form
          id="order-template-form"
          onSubmit={handleSubmit}
        >
          <Pane
            id="order-settings-order-templates-editor"
            defaultWidth="fill"
            paneTitle={titleCreate}
            dismissible
            onClose={close}
            lastMenu={this.getLastMenu()}
          >
            <Row center="xs">
              <Col xs={12} md={8}>
                <Row end="xs">
                  <Col xs={12}>
                    <ExpandAllButton
                      accordionStatus={sections}
                      onToggle={this.handleExpandAll}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row center="xs">
              <Col xs={12} md={8}>
                <AccordionSet
                  accordionStatus={sections}
                  onToggle={this.onToggleSection}
                >
                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.TEMPLATE_INFO]}
                    id={ORDER_TEMPLATES_ACCORDION.TEMPLATE_INFO}
                  >
                    <TemplateInformationForm />
                  </Accordion>

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.PO_INFO]}
                    id={ORDER_TEMPLATES_ACCORDION.PO_INFO}
                  >
                    <PurchaseOrderInformationForm />
                  </Accordion>

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.PO_NOTES]}
                    id={ORDER_TEMPLATES_ACCORDION.PO_NOTES}
                  >
                    <PurchaseOrderNotesForm />
                  </Accordion>

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.PO_SUMMARY]}
                    id={ORDER_TEMPLATES_ACCORDION.PO_SUMMARY}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_ITEM_DETAILS]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_ITEM_DETAILS}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_DETAILS]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_DETAILS}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_COST_DETAILS]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_COST_DETAILS}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_VENDOR]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_VENDOR}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_FUND_DISTIBUTION]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_FUND_DISTIBUTION}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_ERESOURCES]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_ERESOURCES}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_FRESOURCES]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_FRESOURCES}
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.POL_LOCATION]}
                    id={ORDER_TEMPLATES_ACCORDION.POL_LOCATION}
                  />
                </AccordionSet>
              </Col>
            </Row>
          </Pane>
        </form>
      </Layer>
    );
  }
}

export default stripesForm({
  enableReinitialize: true,
  form: 'orderTemplateForm',
  navigationCheck: true,
})(OrderTemplatesEditor);
