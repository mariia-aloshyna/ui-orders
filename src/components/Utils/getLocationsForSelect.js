import { get } from 'lodash';

const getLocationsForSelect = (resources) => get(resources, 'locations.records', []).map(({ name, id, code }) => ({
  label: `${name} (${code})`,
  value: id,
}));

export default getLocationsForSelect;
