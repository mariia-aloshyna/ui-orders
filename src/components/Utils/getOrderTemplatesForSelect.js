import {
  get,
  sortBy,
} from 'lodash';

export default (resources) => sortBy(
  get(resources, 'orderTemplates.records', []).map((v) => {
    const { templateName, templateCode } = JSON.parse(v.value);

    return {
      label: templateCode ? `${templateName} (${templateCode})` : templateName,
      value: v.id,
    };
  }), 'label',
);
