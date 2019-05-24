import { get } from 'lodash';

export default (resources) => get(resources, 'fund.records', []).map(({ name, code, id }) => ({
  label: name,
  value: id,
  code,
}));
