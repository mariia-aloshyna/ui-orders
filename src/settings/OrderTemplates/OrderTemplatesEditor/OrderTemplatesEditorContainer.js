import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ORDER_TEMPLATES } from '../../../components/Utils/resources';
import {
  MODULE_ORDERS,
  CONFIG_ORDER_TEMPLATES,
} from '../../../components/Utils/const';

import OrderTemplatesEditor from './OrderTemplatesEditor';

class OrderTemplatesEditorContainer extends Component {
  static manifest = Object.freeze({
    orderTemplates: ORDER_TEMPLATES,
  });

  static propTypes = {
    close: PropTypes.func.isRequired,
    mutator: PropTypes.object.isRequired,
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
    const { close } = this.props;

    return (
      <OrderTemplatesEditor
        onSubmit={this.saveOrderTemplate}
        close={close}
      />
    );
  }
}

export default OrderTemplatesEditorContainer;
