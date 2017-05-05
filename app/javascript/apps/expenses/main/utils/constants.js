import moment from 'moment';

const now = moment();
const minYear = now.add(-5, 'year');
const minDate = new Date(minYear.year(), 0, 0);

export const CREATE_FORM_FIELDS = {
  amount: {
    label: 'Amount',
    numberOnly: true,
    order: [6, 0],
    placeholder: '$00.00',
    required: true,
    scale: 2,
    type: 'text',
  },
  billable: {
    defaultValue: true,
    label: 'Billable',
    order: 8,
    type: 'checkbox',
  },
  customer_id: {
    label: 'Customer',
    order: [0, 1],
    required: false,
    type: 'select',
  },
  date: {
    label: 'Date',
    minDate,
    order: [6, 1],
    required: true,
    type: 'date',
  },
  description: {
    label: 'Description',
    order: 5,
    placeholder: 'Describe this expense...',
    required: true,
    rows: 5,
    type: 'textarea',
  },
  expense_grouping_id: {
    label: 'Expense',
    order: 4,
    required: false,
    type: 'select',
  },
  qb_account_id: {
    label: 'Account',
    order: 2,
    required: true,
    type: 'select',
  },
  qb_class_id: {
    label: 'Class',
    order: 3,
    required: false,
    type: 'select',
  },
  vendor_id: {
    label: 'Vendor',
    order: [0, 0],
    required: true,
    type: 'select',
  },
};

export const TABLE_HEADERS = [
  'Vendor',
  'Customer',
  'Amount',
  'Date',
  '',
];
