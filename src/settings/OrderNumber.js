import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ConfigManager } from '@folio/stripes/smart-components';

import { MODULE_ORDERS } from '../components/Utils/const';
import getOrderNumberSetting from '../components/Utils/getOrderNumberSetting';
import OrderNumberForm from './OrderNumberForm';
import css from './OrderNumber.css';

class OrderNumber extends Component {
  static propTypes = {
    label: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.configManager = props.stripes.connect(ConfigManager);
  }

  beforeSave = (data) => {
    const {
      canUserEditOrderNumber,
      selectedPrefixes,
      selectedSuffixes,
    } = data;

    return JSON.stringify({
      canUserEditOrderNumber,
      selectedPrefixes: selectedPrefixes.map(item => item.value),
      selectedSuffixes: selectedSuffixes.map(item => item.value),
    });
  }

  render() {
    const { label, stripes } = this.props;

    return (
      <div
        data-test-order-settings-order-number
        className={css.formWrapper}
      >
        <this.configManager
          configName="orderNumber"
          getInitialValues={getOrderNumberSetting}
          label={label}
          moduleName={MODULE_ORDERS}
          onBeforeSave={this.beforeSave}
        >
          <OrderNumberForm stripes={stripes} />
        </this.configManager>
      </div>
    );
  }
}

export default OrderNumber;
