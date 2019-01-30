const Filters = () => {
  return [
    {
      label: 'Assigned to me',
      name: 'assigned_to',
      cql: 'assigned_to',
      values: [],
    },
    {
      label: 'Approval Status',
      name: 'approval_status',
      cql: 'approval_status',
      values: ['Approved', 'Pending', 'On hold', 'Not approved'],
    },
  ];
};

const SearchableIndexes = [
  { label: 'All', value: 'all', makeQuery: term => `(id="${term}*" or poNumber="${term}*" or vendor="${term}*" or assigned_to="${term}*")` },
  { label: 'ID', value: 'id', makeQuery: term => `(id="${term}*")` },
  { label: 'PO Number', value: 'poNumber', makeQuery: term => `(poNumber="${term}*")` },
  { label: 'Vendor', value: 'vendor', makeQuery: term => `(vendor="${term}*")` },
  { label: 'Assigned To', value: 'assigned_to', makeQuery: term => `(assigned_to="${term}*")` },
];

export { Filters, SearchableIndexes };
