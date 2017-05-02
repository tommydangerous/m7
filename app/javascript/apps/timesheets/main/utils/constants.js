import moment from 'moment';

const now = moment();
const minYear = now.add(-5, 'year');
const minDate = new Date(minYear.year(), 0, 0);

export const CREATE_FORM_FIELDS = {
  // duration: 5.75
  // qb_class_id
  // type: Employee, Vendor

  billable: {
    defaultValue: true,
    label: 'Billable',
    order: 8,
    type: 'checkbox',
  },
  customer_id: {
    label: 'Customer',
    order: 1,
    required: true,
    type: 'select',
  },
  date: {
    label: 'Date',
    minDate,
    order: 7,
    required: true,
    type: 'date',
  },
  description: {
    label: 'Description',
    order: 3,
    placeholder: 'Describe this time...',
    required: true,
    rows: 5,
    type: 'textarea',
  },
  employee_id: {
    label: 'Employee',
    order: 0,
    required: true,
    type: 'select',
  },
  end_time: {
    label: 'End time',
    order: 5,
    placeholder: 'HH:MM',
    required: true,
    type: 'text',
  },
  hours_off_duty: {
    label: 'Hours off duty',
    numberOnly: true,
    order: 6,
    placeholder: '5.25',
    required: true,
    scale: 2,
    type: 'text',
  },
  inventory_item_id: {
    label: 'Inventory item',
    order: 2,
    required: true,
    type: 'select',
  },
  start_time: {
    label: 'Start time',
    order: 4,
    placeholder: 'HH:MM',
    required: true,
    type: 'text',
  },
};

export const TABLE_HEADERS = [
  'Employee',
  'Customer',
  'Start',
  'End',
  'Hours off duty',
  'Duration',
  'Edit',
  'Delete',
];
