import {
  CHECKIN_API,
  CONFIG_API,
  FUND_API,
  IDENTIFIER_TYPES_API,
  ITEMS_API,
  LINE_DETAIL_API,
  LOCATIONS_API,
  MATERIAL_TYPES_API,
  ORDER_DETAIL_API,
  ORDER_PIECES_API,
  RECEIVE_API,
  RECEIVING_API,
  USERS_API,
  VENDORS_API,
} from './api';
import {
  CONFIG_ADDRESSES,
  CONFIG_CLOSING_REASONS,
  CONFIG_CREATE_INVENTORY,
  CONFIG_LINES_LIMIT,
  CONFIG_ORDER_NUMBER,
  LIMIT_MAX,
  MODULE_ORDERS,
  MODULE_TENANT,
} from './const';

const BASE_RESOURCE = {
  perRequest: LIMIT_MAX,
  throwErrors: false,
  type: 'okapi',
};

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
  records: 'locations',
  throwErrors: false,
  ...BASE_RESOURCE,
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
  ...BASE_RESOURCE,
};

export const CHECKIN = {
  clientGeneratePk: false,
  fetch: false,
  path: CHECKIN_API,
  records: 'toBeReceived',
  throwErrors: false,
  ...BASE_RESOURCE,
};

export const ORDER_PIECES = {
  accumulate: true,
  clientGeneratePk: false,
  fetch: false,
  path: ORDER_PIECES_API,
  records: 'checkInItems',
  throwErrors: false,
  ...BASE_RESOURCE,
};

export const LINE = {
  type: 'okapi',
  path: LINE_DETAIL_API,
  throwErrors: false,
};

export const IDENTIFIER_TYPES = {
  path: IDENTIFIER_TYPES_API,
  records: 'identifierTypes',
  ...BASE_RESOURCE,
};

export const MATERIAL_TYPES = {
  path: MATERIAL_TYPES_API,
  records: 'mtypes',
  ...BASE_RESOURCE,
};

export const VENDORS = {
  path: VENDORS_API,
  GET: {
    params: {
      query: 'cql.allRecords=1 sortby name',
    },
  },
  records: 'organizations',
  ...BASE_RESOURCE,
};

export const CLOSING_REASONS = {
  ...BASE_RESOURCE,
  path: CONFIG_API,
  records: 'configs',
  GET: {
    params: {
      query: `(module=${MODULE_ORDERS} and configName=${CONFIG_CLOSING_REASONS})`,
    },
  },
};

export const LINES_LIMIT = {
  records: 'configs',
  path: CONFIG_API,
  GET: {
    params: {
      query: `(module=${MODULE_ORDERS} and configName=${CONFIG_LINES_LIMIT})`,
    },
  },
  ...BASE_RESOURCE,
};

export const ADDRESSES = {
  records: 'configs',
  path: CONFIG_API,
  GET: {
    params: {
      query: `(module=${MODULE_TENANT} and configName=${CONFIG_ADDRESSES})`,
    },
  },
  ...BASE_RESOURCE,
};

export const FUND = {
  path: FUND_API,
  records: 'funds',
  ...BASE_RESOURCE,
};

export const USERS = {
  path: USERS_API,
  records: 'users',
  ...BASE_RESOURCE,
};

export const CREATE_INVENTORY = {
  path: CONFIG_API,
  records: 'configs',
  GET: {
    params: {
      query: `(module=${MODULE_ORDERS} and configName=${CONFIG_CREATE_INVENTORY})`,
    },
  },
  ...BASE_RESOURCE,
};

export const ORDER_NUMBER_SETTING = {
  path: CONFIG_API,
  records: 'configs',
  GET: {
    params: {
      query: `(module=${MODULE_ORDERS} and configName=${CONFIG_ORDER_NUMBER})`,
    },
  },
  ...BASE_RESOURCE,
};
