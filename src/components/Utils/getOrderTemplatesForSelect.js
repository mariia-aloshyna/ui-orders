import {
  get,
  orderBy,
} from 'lodash';

export default (resources) => orderBy(
  get(resources, 'orderTemplates.records', []).map(({ templateName, templateCode, id }) => {
    return {
      label: templateCode ? `${templateName} (${templateCode})` : templateName,
      value: id,
    };
  }),
  [template => template.label.toLowerCase()],
  ['asc'],
);
