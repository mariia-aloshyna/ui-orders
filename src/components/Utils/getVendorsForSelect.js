import { get } from 'lodash';

export default (resources) => get(resources, 'vendors.records', []).map((v) => ({
  label: v.name,
  value: v.id,
}));
