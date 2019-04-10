export const STATUS_IN_PROCESS = 'inProcess';
export const STATUS_ON_ORDER = 'onOrder';
export const STATUS_RECEIVED = 'received';
export const ITEM_STATUS = {
  [STATUS_IN_PROCESS]: 'In process',
  [STATUS_ON_ORDER]: 'On order',
  [STATUS_RECEIVED]: 'Received',
};

export const CHECK_IN_ITEM_STATUSES = [STATUS_IN_PROCESS];
export const RECEIVE_ITEM_STATUSES = Object.keys(ITEM_STATUS);
