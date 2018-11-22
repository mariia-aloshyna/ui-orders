const REQUIRED = 'Required!';

// Validate Required Field
const Required = (value) => {
  if (value) return undefined;
  return REQUIRED;
};

// Field is required only if 'vendor_detail.ref_number' isn't empty
const requiredRefNumber = (value, allValues) => {
  const refNumber = allValues.vendor_detail.ref_number;
  return refNumber && !value
    ? REQUIRED
    : undefined;
};

export { Required, requiredRefNumber };
