// accepts value as a String and saves it as Number with 2 digits after decimal point
const parseMoney = (value) => {
  return value ? Number(Number(value).toFixed(2)) : value;
};

export default parseMoney;
