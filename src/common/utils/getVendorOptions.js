// eslint-disable-next-line import/prefer-default-export
export const getVendorOptions = (vendors = []) => vendors.map(vendor => ({
  value: vendor.id,
  label: `${vendor.name} (${vendor.code})`,
}));
