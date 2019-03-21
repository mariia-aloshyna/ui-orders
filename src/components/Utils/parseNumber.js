const parseNumber = (value) => {
  return value && value.length > 0 ? Number(value) : value;
};

export default parseNumber;
