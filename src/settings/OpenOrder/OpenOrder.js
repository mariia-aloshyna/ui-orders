import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ConfigManager } from '@folio/stripes/smart-components';
import { stripesShape } from '@folio/stripes/core';
import { getConfigSetting } from '@folio/stripes-acq-components';

import {
  MODULE_ORDERS,
  CONFIG_OPEN_ORDER,
} from '../../components/Utils/const';
import OpenOrderForm from './OpenOrderForm';

class OpenOrder extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.configManager = props.stripes.connect(ConfigManager);
  }

  beforeSave = (data) => JSON.stringify(data);

  render() {
    const { label } = this.props;

    return (
      <this.configManager
        configName={CONFIG_OPEN_ORDER}
        getInitialValues={getConfigSetting}
        label={label}
        moduleName={MODULE_ORDERS}
        onBeforeSave={this.beforeSave}
      >
        <div data-test-order-settings-open-order>
          <OpenOrderForm />
        </div>
      </this.configManager>
    );
  }
}

export default OpenOrder;
