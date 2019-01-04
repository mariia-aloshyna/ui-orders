import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { ConfigManager } from '@folio/stripes/smart-components';
import {
  Accordion,
  Checkbox,
  Col,
  Headline,
  Row,
} from '@folio/stripes/components';

import { MODULE_ORDERS } from '../components/Utils/const';

class OrderNumber extends Component {
  static propTypes = {
    label: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  getInitialValues = (settings) => {
    const value = settings.length && settings[0].value === 'true';

    return { orderNumber: value };
  }

  render() {
    const { label } = this.props;

    return (
      <this.configManager
        configName="orderNumber"
        getInitialValues={this.getInitialValues}
        label={label}
        moduleName={MODULE_ORDERS}
      >
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
                component={Checkbox}
                label={<FormattedMessage id="ui-orders.settings.poNumber.editPONumber" />}
                name="orderNumber"
                type="checkbox"
              />
            </Col>
          </Row>
        </Accordion>
      </this.configManager>
    );
  }
}

export default OrderNumber;
