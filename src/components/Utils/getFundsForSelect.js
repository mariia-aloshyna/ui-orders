import { get } from 'lodash';

export default (resources) => get(resources, 'fund.records', []).map(({ name, id, code }) => ({
  label: name,
  value: id,
  code,
}));
