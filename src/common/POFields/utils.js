import { ORDER_TYPE } from '../../components/PurchaseOrder/PODetails/FieldOrderType';

// eslint-disable-next-line import/prefer-default-export
export const isOngoing = (orderType) => orderType === ORDER_TYPE.ongoing;
