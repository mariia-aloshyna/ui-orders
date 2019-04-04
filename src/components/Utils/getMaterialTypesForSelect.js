import { get } from 'lodash';

export default (resources) => get(resources, ['materialTypes', 'records'], []).map(({ id, name }) => ({
  label: name,
  value: id,
}));
