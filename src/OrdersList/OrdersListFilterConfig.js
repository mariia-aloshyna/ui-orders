import { FILTERS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const filterConfig = [
  {
    name: FILTERS.ASSIGNED_TO,
    cql: FILTERS.ASSIGNED_TO,
    values: [],
  },
  {
    name: FILTERS.STATUS,
    cql: FILTERS.STATUS,
    values: [],
  },
  {
    name: FILTERS.RECEIPT_STATUS,
    cql: FILTERS.RECEIPT_STATUS,
    values: [],
  },
  {
    name: FILTERS.DATE_ORDERED,
    cql: FILTERS.DATE_ORDERED,
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.PO_NUMBER,
    cql: FILTERS.PO_NUMBER,
    values: [],
  },
];
