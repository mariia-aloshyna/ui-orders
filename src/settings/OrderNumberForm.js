import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import stripesForm from '@folio/stripes/form';

import {
  Accordion,
  AccordionSet,
  Button,
  Checkbox,
  Col,
  Headline,
  Pane,
  Row,
} from '@folio/stripes/components';

class OrderNumberForm extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      store: PropTypes.object.isRequired
    }),
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.object.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  onSave = (settings) => {
    const { onSubmit } = this.props;
    const { isEditPONumber } = settings;
    const orderNumberSettings = JSON.stringify({ isEditPONumber });

    onSubmit({ poNumber: orderNumberSettings });
  }

  getLastMenu = () => {
    const { pristine, submitting } = this.props;

    return (
      <Button
        disabled={(pristine || submitting)}
        id="edit-po-number-saveBtn"
        marginBottom0
        type="submit"
      >
        <FormattedMessage id="ui-orders.settings.poNumber.saveBtn" />
      </Button>
    );
  }

  render() {
    const { handleSubmit, label } = this.props;

    return (
      <form
        id="po-number-form"
        onSubmit={handleSubmit(this.onSave)}
      >
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          lastMenu={this.getLastMenu()}
          paneTitle={label}
        >
          <AccordionSet>
            <Accordion
              label={<FormattedMessage id="ui-orders.settings.poNumber" />}
              separator={false}
            >
              <Row>
                <Col xs={12}>
                  <Headline margin="none">
                    <FormattedMessage id="ui-orders.settings.poNumber" />
                  </Headline>
                  <Field
                    label={<FormattedMessage id="ui-orders.settings.poNumber.editPONumber" />}
                    name="isEditPONumber"
                    component={Checkbox}
                    type="checkbox"
                  />
                </Col>
              </Row>
            </Accordion>
          </AccordionSet>
        </Pane>
      </form>
    );
  }
}

export default stripesForm({
  form: 'po-number-form',
  navigationCheck: true,
  enableReinitialize: true,
})(OrderNumberForm);
