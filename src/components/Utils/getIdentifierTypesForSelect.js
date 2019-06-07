import { get } from 'lodash';

export default (resources) => get(resources, ['identifierTypes', 'records'], []).map(({ id, name }) => ({
  label: name,
  value: id,
}));
