import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ORDER_TEMPLATES,
  LOCATIONS,
} from '../../../components/Utils/resources';
import {
  MODULE_ORDERS,
  CONFIG_ORDER_TEMPLATES,
} from '../../../components/Utils/const';
import getLocationsForSelect from '../../../components/Utils/getLocationsForSelect';

import OrderTemplatesEditor from './OrderTemplatesEditor';

class OrderTemplatesEditorContainer extends Component {
  static manifest = Object.freeze({
    orderTemplates: ORDER_TEMPLATES,
    locations: LOCATIONS,
  });

  static propTypes = {
    close: PropTypes.func.isRequired,
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
  };

  saveOrderTemplate = (values) => {
    const { close, mutator: { orderTemplates } } = this.props;

    const orderTemplateBody = {
      module: MODULE_ORDERS,
      configName: `${MODULE_ORDERS}.${CONFIG_ORDER_TEMPLATES}`,
      code: (new Date()).valueOf(),
      value: JSON.stringify(values),
    };

    orderTemplates.POST(orderTemplateBody)
      .then(close);
  };

  render() {
    const { close, resources } = this.props;
    const locations = getLocationsForSelect(resources);

    return (
      <OrderTemplatesEditor
        onSubmit={this.saveOrderTemplate}
        close={close}
        locations={locations}
      />
    );
  }
}

export default OrderTemplatesEditorContainer;
