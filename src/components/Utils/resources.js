import {
  CHECKIN_API,
  IDENTIFIER_TYPES_API,
  ITEMS_API,
  LINE_DETAIL_API,
  LOCATIONS_API,
  ORDER_DETAIL_API,
  ORDER_PIECES_API,
  RECEIVE_API,
  RECEIVING_API,
  VENDORS_API,
  FUNDS_API,
} from './api';
import { LIMIT_MAX } from './const';

export const RECEIVING_HISTORY = {
  fetch: false,
  accumulate: true,
  type: 'okapi',
  path: RECEIVING_API,
  records: 'receivingHistory',
  throwErrors: false,
};

export const LOCATIONS = {
  path: LOCATIONS_API,
  perRequest: LIMIT_MAX,
  records: 'locations',
  throwErrors: false,
  type: 'okapi',
};

export const ORDER = {
  type: 'okapi',
  path: ORDER_DETAIL_API,
  throwErrors: false,
};

export const RECEIVE = {
  clientGeneratePk: false,
  fetch: false,
  path: RECEIVE_API,
  records: 'toBeReceived',
  throwErrors: false,
  type: 'okapi',
};

export const ITEMS = {
  fetch: false,
  accumulate: true,
  path: ITEMS_API,
  records: 'items',
  throwErrors: false,
  type: 'okapi',
};

export const CHECKIN = {
  clientGeneratePk: false,
  fetch: false,
  path: CHECKIN_API,
  records: 'toBeReceived',
  throwErrors: false,
  type: 'okapi',
};

export const ORDER_PIECES = {
  accumulate: true,
  clientGeneratePk: false,
  fetch: false,
  path: ORDER_PIECES_API,
  records: 'checkInItems',
  throwErrors: false,
  type: 'okapi',
};

export const LINE = {
  type: 'okapi',
  path: LINE_DETAIL_API,
  throwErrors: false,
};

export const IDENTIFIER_TYPES = {
  type: 'okapi',
  path: IDENTIFIER_TYPES_API,
  records: 'identifierTypes',
  perRequest: LIMIT_MAX,
};

export const MATERIAL_TYPES = {
  type: 'okapi',
  path: 'material-types',
  records: 'mtypes',
  perRequest: LIMIT_MAX,
};

export const VENDORS = {
  type: 'okapi',
  path: VENDORS_API,
  GET: {
    params: {
      query: 'cql.allRecords=1 sortby name',
    },
  },
  records: 'organizations',
  perRequest: LIMIT_MAX,
};

export const FUNDS = {
  type: 'okapi',
  path: FUNDS_API,
  records: 'funds',
  perRequest: LIMIT_MAX,
};
