const REQUIRED = 'Required!';

// Validate Required Field
export const required = (value) => {
  return value ? undefined : REQUIRED;
};

// Field is required only if 'vendor_detail.ref_number' isn't empty
export const requiredRefNumber = (value, allValues) => {
  const refNumber = allValues.vendor_detail.ref_number;
  return refNumber && !value
    ? REQUIRED
    : undefined;
};

export { required as Required };
