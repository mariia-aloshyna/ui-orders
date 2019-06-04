const DATE_ORDERED_SEARCH = 'dateOrdered';
const PO_NUMBER_SEARCH = 'poNumber';
const CREATED_DATE_SEARCH = 'meta.createdDate';
const OWNER_SEARCH = 'owner';

export const ordersSearchTemplate = `(
  ${PO_NUMBER_SEARCH}="%{query.query}*" OR
  ${DATE_ORDERED_SEARCH}="%{query.query}*" OR
  ${CREATED_DATE_SEARCH}="%{query.query}*" OR
  ${OWNER_SEARCH}="%{query.query}*"
)`;

export const searchableIndexes = [
  {
    label: 'keyword',
    value: '',
    makeQuery: term => `(
      "${PO_NUMBER_SEARCH}"="${term}*" or
      "${DATE_ORDERED_SEARCH}"="${term}*" or
      "${CREATED_DATE_SEARCH}"="${term}*" or
      "${OWNER_SEARCH}"="${term}*"
    )`,
  },
  {
    label: DATE_ORDERED_SEARCH,
    value: DATE_ORDERED_SEARCH,
    makeQuery: term => `(${DATE_ORDERED_SEARCH}="${term}")`,
  },
  {
    label: PO_NUMBER_SEARCH,
    value: PO_NUMBER_SEARCH,
    makeQuery: term => `(${PO_NUMBER_SEARCH}="${term}")`,
  },
];
