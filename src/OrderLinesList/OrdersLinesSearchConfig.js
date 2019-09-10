import { generateQueryTemplate } from '@folio/stripes-acq-components';

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

export const searchableIndexes = [keywordIndex, ...indexes.map(index => ({ label: index, value: index }))];
export const queryTemplate = generateQueryTemplate(indexes);
