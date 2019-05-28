// eslint-disable-next-line import/prefer-default-export
export const getLocationOptions = (locations = []) => locations.map(location => ({
  value: location.id,
  label: `${location.name} (${location.code})`,
}));
