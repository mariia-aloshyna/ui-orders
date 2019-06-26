import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  get,
  find,
} from 'lodash';

import {
  IDENTIFIER_TYPES,
  ADDRESSES,
  ORDER_TEMPLATES,
  LOCATIONS,
  FUND,
  CREATE_INVENTORY,
  PREFIXES_SETTING,
  SUFFIXES_SETTING,
  VENDORS,
  MATERIAL_TYPES,
} from '../../../components/Utils/resources';
import {
  MODULE_ORDERS,
  CONFIG_ORDER_TEMPLATES,
} from '../../../components/Utils/const';
import getIdentifierTypesForSelect from '../../../components/Utils/getIdentifierTypesForSelect';
import getLocationsForSelect from '../../../components/Utils/getLocationsForSelect';
import getFundsForSelect from '../../../components/Utils/getFundsForSelect';
import getMaterialTypesForSelect from '../../../components/Utils/getMaterialTypesForSelect';
import {
  getCreateInventorySetting,
  getAddresses,
  getAddressOptions,
  getSettingsList,
  getVendorOptions,
} from '../../../common/utils';

import { getOrderTemplatesList } from '../util';
import OrderTemplatesEditor from './OrderTemplatesEditor';

const INITIAL_VALUES = {};

class OrderTemplatesEditorContainer extends Component {
  static manifest = Object.freeze({
    orderTemplates: ORDER_TEMPLATES,
    identifierTypes: IDENTIFIER_TYPES,
    locations: LOCATIONS,
    fund: FUND,
    createInventory: CREATE_INVENTORY,
    prefixesSetting: PREFIXES_SETTING,
    suffixesSetting: SUFFIXES_SETTING,
    addresses: ADDRESSES,
    vendors: VENDORS,
    materialTypes: MATERIAL_TYPES,
  });

  static propTypes = {
    close: PropTypes.func.isRequired,
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  saveOrderTemplate = (values) => {
    const { close, mutator: { orderTemplates }, match, resources } = this.props;
    const orderTemplatesConfig = get(resources, ['orderTemplates', 'records'], []);
    const id = get(match, ['params', 'id']);
    const mutatorMethod = id ? 'PUT' : 'POST';
    const value = JSON.stringify(values);
    let orderTemplateBody;

    if (id) {
      orderTemplateBody = find(orderTemplatesConfig, { id });
    } else {
      orderTemplateBody = {
        module: MODULE_ORDERS,
        configName: `${MODULE_ORDERS}.${CONFIG_ORDER_TEMPLATES}`,
        code: (new Date()).valueOf(),
      };
    }

    orderTemplateBody = { ...orderTemplateBody, value };

    orderTemplates[mutatorMethod](orderTemplateBody)
      .then(close);
  };

  render() {
    const { close, resources, match } = this.props;
    const locations = getLocationsForSelect(resources);
    const funds = getFundsForSelect(resources);
    const identifierTypes = getIdentifierTypesForSelect(resources);
    const createInventorySetting = getCreateInventorySetting(get(resources, ['createInventory', 'records'], []));
    const vendors = getVendorOptions(get(resources, 'vendors.records', []));
    const prefixesSetting = getSettingsList(get(resources, 'prefixesSetting.records', {}));
    const suffixesSetting = getSettingsList(get(resources, 'suffixesSetting.records', {}));
    const addresses = getAddressOptions(getAddresses(get(resources, 'addresses.records', [])));
    const materialTypes = getMaterialTypesForSelect(resources);

    const orderTemplatesList = getOrderTemplatesList(get(resources, ['orderTemplates', 'records'], []));
    const id = get(match, ['params', 'id']);
    const template = id
      ? find(orderTemplatesList, { id })
      : { orderTemplate: INITIAL_VALUES };
    const title = get(template, 'title', '');

    return (
      <OrderTemplatesEditor
        title={title}
        onSubmit={this.saveOrderTemplate}
        close={close}
        funds={funds}
        initialValues={template.orderTemplate}
        identifierTypes={identifierTypes}
        locations={locations}
        createInventorySetting={createInventorySetting}
        prefixesSetting={prefixesSetting.selectedItems}
        suffixesSetting={suffixesSetting.selectedItems}
        addresses={addresses}
        vendors={vendors}
        materialTypes={materialTypes}
      />
    );
  }
}

export default OrderTemplatesEditorContainer;
