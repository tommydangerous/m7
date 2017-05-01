export const CREATE_FORM_FIELDS = [
  {
    defaultValue: '',
    label: 'Vendor',
    name: 'vendor_id',
    options: [
      {
        text: 'Samsung',
        value: 1,
      },
      {
        text: 'Tesla',
        value: 2,
      },
    ],
    type: 'select',
  },
  {
    defaultValue: '',
    label: 'Customer',
    name: 'customer_id',
    options: [
      {
        text: 'Apple',
        value: 1,
      },
      {
        text: 'Google',
        value: 2,
      },
    ],
    type: 'select',
  },
  {
    defaultValue: '',
    label: 'Expense group',
    name: 'expense_grouping_id',
    options: [
      {
        text: '???',
        value: 1,
      },
      {
        text: '???',
        value: 2,
      },
    ],
    type: 'select',
  },
  {
    defaultValue: '',
    label: 'QB Account',
    name: 'qb_account_id',
    options: [
      {
        text: 'Advertising',
        value: 1,
      },
      {
        text: 'Bank charges',
        value: 2,
      },
    ],
    type: 'select',
  },
  {
    defaultValue: '',
    label: 'Description',
    name: 'description',
    placeholder: 'Description',
    rows: 5,
    type: 'textarea',
  },
  {
    label: 'Amount',
    placeholder: '$00.00',
    name: 'amount',
    numberOnly: true,
    scale: 2,
    type: 'text',
  },
  {
    label: 'Date',
    name: 'date',
    type: 'date',
  },
  {
    defaultValue: 1,
    label: 'Billable',
    name: 'billable',
    type: 'checkbox',
  },
];

export const TABLE_HEADERS = [
  'Vendor',
  'Customer',
  'Amount',
  'Date',
  'Edit',
  'Delete',
];
