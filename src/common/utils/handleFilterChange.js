// should be bound to the component context, like `this.handleFilterChange = handleFilterChange.bind(this);`
// eslint-disable-next-line import/prefer-default-export
export function handleFilterChange({ name, values }) {
  const { mutator } = this.props;
  const newFilters = {
    ...this.getActiveFilters(),
    [name]: values,
  };

  const filters = Object.keys(newFilters)
    .map((filterName) => {
      return newFilters[filterName]
        .map((filterValue) => `${filterName}.${filterValue}`)
        .join(',');
    })
    .filter(filter => filter)
    .join(',');

  mutator.query.update({ filters });
}
