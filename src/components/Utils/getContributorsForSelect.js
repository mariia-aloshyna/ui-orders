import { get } from 'lodash';

export default (resources) => get(resources, 'contributorNameTypes.records', []).map((v) => ({
  label: v.name,
  value: v.id,
}));
