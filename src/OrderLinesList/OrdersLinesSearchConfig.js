// eslint-disable-next-line import/prefer-default-export
export const searchableIndexes = [
  {
    label: 'keyword',
    value: '',
    makeQuery: term => `(
      title="${term}*" or
      contributors="${term}*" or
      poLineNumber="${term}*" or
      requester="${term}*" or
      vendorDetail.vendorAccount="${term}*" or
      vendorDetail.refNumber="${term}*" or
      details.productIds="${term}*"
    )`,
  },
  {
    label: 'contributor',
    value: 'contributors',
    makeQuery: term => `(contributors="${term}")`,
  },
  {
    label: 'poLineNumber',
    value: 'poLineNumber',
    makeQuery: term => `(poLineNumber="${term}")`,
  },
  {
    label: 'requester',
    value: 'requester',
    makeQuery: term => `(requester="${term}")`,
  },
  {
    label: 'title',
    value: 'title',
    makeQuery: term => `(title="${term}*")`,
  },
  {
    label: 'vendorAccount',
    value: 'vendorDetail.vendorAccount',
    makeQuery: term => `(vendorDetail.vendorAccount="${term}")`,
  },
  {
    label: 'vendorReferenceNumber',
    value: 'vendorDetail.refNumber',
    makeQuery: term => `(vendorDetail.refNumber="${term}")`,
  },
];
