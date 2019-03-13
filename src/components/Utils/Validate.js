import { get } from 'lodash';

const REQUIRED = 'Required!';
const currentYear = new Date().getFullYear();

// Validate Required Field
export const required = (value) => {
  return value ? undefined : REQUIRED;
};

// Field is required only if 'vendorDetail.refNumber' isn't empty
export const requiredRefNumber = (value, allValues) => {
  const refNumber = get(allValues, 'vendorDetail.refNumber');

  return refNumber && !value
    ? REQUIRED
    : undefined;
};

// Field is required only if 'vendorDetail.refNumberType' isn't empty
export const requiredRefNumberType = (value, allValues) => {
  const refNumberType = get(allValues, 'vendorDetail.refNumberType');

  return refNumberType && !value
    ? REQUIRED
    : undefined;
};

// Validation for Fields with type 'number' requires positive integer
export const requiredPositiveNumber = (value) => {
  return value > 0
    ? undefined
    : REQUIRED;
};

export const validateYearIsPast = (value) => {
  if (!value) {
    return undefined;
  }
  const year = parseInt(value, 10);

  if (year > 1000 && year <= currentYear) {
    return undefined;
  }

  return 'Field should be 4-digit year';
};

export { required as Required };
