import {
  get,
  sortBy,
} from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getOrderTemplatesList = (configs) => (
  sortBy(configs.map(item => {
    let orderTemplate = get(item, 'value', {});

    try {
      orderTemplate = JSON.parse(orderTemplate);
    } catch (e) {
      orderTemplate = {};
    }

    return {
      id: item.id,
      title: orderTemplate.templateName,
      orderTemplate,
    };
  }), 'title')
);
