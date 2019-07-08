const indexes = [
  'contributors',
  'poLineNumber',
  'details.productIds',
  'requester',
  'title',
  'publisher',
  'vendorDetail.vendorAccount',
  'vendorDetail.refNumber',
  'donor',
  'selector',
  'physical.volumes',
];

const keywordIndex = {
  label: 'keyword',
  value: '',
};

// eslint-disable-next-line import/prefer-default-export
export const searchableIndexes = [keywordIndex, ...indexes.map(index => ({ label: index, value: index }))];
