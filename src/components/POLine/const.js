export const ERESOURCE = 'Electronic Resource';
export const PHYSICAL = 'Physical Resource';
export const PE_MIX = 'P/E Mix';
export const OTHER = 'Other';

export const ERESOURCES = [ERESOURCE, PE_MIX];
export const PHRESOURCES = [PHYSICAL, PE_MIX];

export const ACCORDION_ID = {
  costDetails: 'costDetails',
  eresources: 'eresources',
  fundDistribution: 'fundDistribution',
  itemDetails: 'itemDetails',
  lineDetails: 'lineDetails',
  location: 'location',
  physical: 'physical',
  vendor: 'vendor',
};

// Mapping between attribute (field) in form and id of accordion
export const MAP_FIELD_ACCORDION = {
  cost: ACCORDION_ID.costDetails,
  details: ACCORDION_ID.itemDetails,
  eresource: ACCORDION_ID.eresources,
  fund_distribution: ACCORDION_ID.fundDistribution,
  locations: ACCORDION_ID.location,
  order_format: ACCORDION_ID.lineDetails,
  po_line_number: ACCORDION_ID.lineDetails,
  publication_date: ACCORDION_ID.itemDetails,
  vendor_detail: ACCORDION_ID.vendor,
};
