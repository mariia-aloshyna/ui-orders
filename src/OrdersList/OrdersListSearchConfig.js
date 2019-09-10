import { generateQueryTemplate } from '@folio/stripes-acq-components';

const indexes = [
  'metadata.createdDate',
  'dateOrdered',
  'poNumber',
];

const keywordIndex = {
  label: 'keyword',
  value: '',
};

export const searchableIndexes = [keywordIndex, ...indexes.map(index => ({ label: index, value: index }))];
export const ordersSearchTemplate = generateQueryTemplate(indexes);
