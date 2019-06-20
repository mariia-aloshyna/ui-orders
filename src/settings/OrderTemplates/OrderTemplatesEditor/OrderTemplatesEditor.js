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
} from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';

import {
  ORDER_TEMPLATES_ACCORDION,
  ORDER_TEMPLATES_ACCORDION_TITLES,
} from '../constants';
import TemplateInformationForm from './TemplateInformationForm';

const titleCreate = <FormattedMessage id="ui-orders.settings.orderTemplates.editor.titleCreate" />;

class OrderTemplatesEditor extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
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

  render() {
    const { close } = this.props;
    const { sections } = this.state;

    return (
      <Layer isOpen>
        <Pane
          id="order-settings-order-templates-editor"
          defaultWidth="fill"
          paneTitle={titleCreate}
          dismissible
          onClose={close}
        >
          <form id="order-template-form">
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
                  />

                  <Accordion
                    label={ORDER_TEMPLATES_ACCORDION_TITLES[ORDER_TEMPLATES_ACCORDION.PO_NOTES]}
                    id={ORDER_TEMPLATES_ACCORDION.PO_NOTES}
                  />

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
          </form>
        </Pane>
      </Layer>
    );
  }
}

export default stripesForm({
  enableReinitialize: true,
  form: 'OrderTemplatesEditor',
  navigationCheck: true,
})(OrderTemplatesEditor);
