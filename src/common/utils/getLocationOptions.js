const getLocationOptions = (locations = []) => locations.map(location => ({
  value: location.id,
  label: `${location.name} (${location.code})`,
}));

export default getLocationOptions;
