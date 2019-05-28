import { FILTERS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const filterConfig = [
  {
    name: FILTERS.RECEIPT_STATUS,
    cql: FILTERS.RECEIPT_STATUS,
    values: [],
  },
  {
    name: FILTERS.PAYMENT_STATUS,
    cql: FILTERS.PAYMENT_STATUS,
    values: [],
  },
  {
    name: FILTERS.ACQUISITION_METHOD,
    cql: FILTERS.ACQUISITION_METHOD,
    values: [],
  },
  {
    name: FILTERS.LOCATION,
    cql: FILTERS.LOCATION,
    values: [],
  },
  {
    name: FILTERS.ORDER_FORMAT,
    cql: FILTERS.ORDER_FORMAT,
    values: [],
  },
  {
    name: FILTERS.MATERIAL_TYPE_ELECTRONIC,
    cql: 'eresource.materialType',
    values: [],
  },
  {
    name: FILTERS.MATERIAL_TYPE_PHYSICAL,
    cql: 'physical.materialType',
    values: [],
  },
  {
    name: FILTERS.DATE_CREATED,
    cql: `metadata.${FILTERS.DATE_CREATED}`,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.VENDOR,
    cql: FILTERS.VENDOR,
    values: [],
  },
];
