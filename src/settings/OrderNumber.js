import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ConfigManager } from '@folio/stripes/smart-components';

import OrderNumberForm from './OrderNumberForm';

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
    const value = settings.length === 0 ? '' : settings[0].value;
    const defaultConfig = { isEditPONumber: false };
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return config;
  }

  render() {
    const { label, stripes } = this.props;

    return (
      <this.configManager
        label={label}
        moduleName="ORDERS"
        configName="poNumber"
        getInitialValues={this.getInitialValues}
        configFormComponent={OrderNumberForm}
        stripes={stripes}
      />
    );
  }
}

export default OrderNumber;
