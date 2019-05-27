// should be bound to the component context, like `this.getActiveFilters = getActiveFilters.bind(this);`
// eslint-disable-next-line import/prefer-default-export
export function getActiveFilters() {
  const { query } = this.props.resources;

  if (!query || !query.filters) return {};

  return query.filters
    .split(',')
    .reduce((filterMap, currentFilter) => {
      const [name, value] = currentFilter.split('.');

      if (!Array.isArray(filterMap[name])) {
        filterMap[name] = [];
      }

      filterMap[name].push(value);

      return filterMap;
    }, {});
}
