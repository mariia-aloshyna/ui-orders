import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';

import { ConfigManager } from '@folio/stripes/smart-components';

import { MODULE_ORDERS } from '../components/Utils/const';
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
    let orderNumberSetting = get(settings, [0, 'value'], '{}');
    const config = {
      canUserEditOrderNumber: false,
      selectedPrefixes: [],
      prefixes: [],
      selectedSuffixes: [],
      suffixes: [],
    };

    try {
      orderNumberSetting = JSON.parse(orderNumberSetting);
    } catch (e) {
      orderNumberSetting = {};
    }

    Object.assign(config, orderNumberSetting);
    config.selectedPrefixes = config.selectedPrefixes.map(item => ({ label: item, value: item }));
    config.prefixes = config.prefixes.map(item => ({ label: item, value: item }));
    config.selectedSuffixes = config.selectedSuffixes.map(item => ({ label: item, value: item }));
    config.suffixes = config.suffixes.map(item => ({ label: item, value: item }));

    return config;
  }

  beforeSave = (data) => {
    const {
      canUserEditOrderNumber,
      selectedPrefixes,
      prefixes,
      selectedSuffixes,
      suffixes,
    } = data;

    return JSON.stringify({
      canUserEditOrderNumber,
      selectedPrefixes: selectedPrefixes.map(item => item.value),
      prefixes: prefixes.map(item => item.value),
      selectedSuffixes: selectedSuffixes.map(item => item.value),
      suffixes: suffixes.map(item => item.value),
    });
  }

  render() {
    const { label, stripes } = this.props;

    return (
      <this.configManager
        configName="orderNumber"
        getInitialValues={this.getInitialValues}
        label={label}
        moduleName={MODULE_ORDERS}
        onBeforeSave={this.beforeSave}
      >
        <OrderNumberForm stripes={stripes} />
      </this.configManager>
    );
  }
}

export default OrderNumber;
