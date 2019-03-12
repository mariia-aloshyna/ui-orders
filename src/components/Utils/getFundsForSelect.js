import { get } from 'lodash';

export default (resources) => get(resources, 'fund.records', []).map(({ name, code }) => ({
  label: name,
  value: code,
  code,
}));
