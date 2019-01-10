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
  physical: 'physical',
  vendor: 'vendor',
};

export const MAP_FIELD_ACCORDION = {
  cost: ACCORDION_ID.costDetails,
  details: ACCORDION_ID.itemDetails,
  eresource: ACCORDION_ID.eresources,
  fund_distribution: ACCORDION_ID.fundDistribution,
  po_line_number: ACCORDION_ID.lineDetails,
  vendor_detail: ACCORDION_ID.vendor,
};
