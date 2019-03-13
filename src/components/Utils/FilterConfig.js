const Filters = () => {
  return [
    {
      label: 'Assigned to me',
      name: 'assignedTo',
      cql: 'assignedTo',
      values: [],
    },
    {
      label: 'Approval Status',
      name: 'approvalStatus',
      cql: 'approvalStatus',
      values: ['Approved', 'Pending', 'On hold', 'Not approved'],
    },
  ];
};

const SearchableIndexes = [
  { label: 'All', value: 'all', makeQuery: term => `(id="${term}*" or poNumber="${term}*" or vendor="${term}*" or assignedTo="${term}*")` },
  { label: 'ID', value: 'id', makeQuery: term => `(id="${term}*")` },
  { label: 'PO Number', value: 'poNumber', makeQuery: term => `(poNumber="${term}*")` },
  { label: 'Vendor', value: 'vendor', makeQuery: term => `(vendor="${term}*")` },
  { label: 'Assigned To', value: 'assignedTo', makeQuery: term => `(assignedTo="${term}*")` },
];

export { Filters, SearchableIndexes };
