import {
  LOCATIONS_API,
  ORDER_DETAIL_API,
  RECEIVING_API,
} from './api';

export const RECEIVING_HISTORY = {
  fetch: false,
  accumulate: true,
  type: 'okapi',
  path: RECEIVING_API,
  records: 'receiving_history',
  throwErrors: false,
};

export const LOCATIONS = {
  type: 'okapi',
  path: LOCATIONS_API,
  records: 'locations',
};

export const ORDER = {
  type: 'okapi',
  path: ORDER_DETAIL_API,
  throwErrors: false,
};
