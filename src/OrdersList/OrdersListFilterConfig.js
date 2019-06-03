import { FILTERS } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const filterConfig = [
  {
    name: FILTERS.STATUS,
    cql: FILTERS.STATUS,
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
    name: FILTERS.ORDER_TYPE,
    cql: FILTERS.ORDER_TYPE,
    values: [],
  },
  {
    name: FILTERS.RENEWAL_DATE,
    cql: 'renewal.renewalDate',
    isRange: true,
    rangeSeparator: ':',
    values: [],
  },
  {
    name: FILTERS.MANUAL_RENEWAL,
    cql: 'renewal.manualRenewal',
    values: [],
  },
  {
    name: FILTERS.RENEWAL_REVIEW_PERIOD,
    cql: 'renewal.reviewPeriod',
    values: [],
  },
  {
    name: FILTERS.VENDOR,
    cql: FILTERS.VENDOR,
    values: [],
  },
  {
    name: FILTERS.PO_NUMBER,
    cql: FILTERS.PO_NUMBER,
    values: [],
  },
];
