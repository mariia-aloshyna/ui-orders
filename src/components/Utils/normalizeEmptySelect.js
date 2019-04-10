const normalizeEmptySelect = (value) => {
  return value === ''
    ? null
    : value;
};

export default normalizeEmptySelect;
