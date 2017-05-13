import moment from 'moment';

const now = moment();
const minYear = now.add(-5, 'year');
const minDate = new Date(minYear.year(), 0, 0);

export const CREATE_FORM_FIELDS = {
  // qb_class_id

  billable: {
    defaultValue: true,
    label: 'Billable',
    order: 8,
    type: 'checkbox',
  },
  customer_id: {
    label: 'Customer',
    order: [1, 0],
    required: true,
    type: 'select',
  },
  date: {
    label: 'Date',
    minDate,
    order: [5, 0],
    required: true,
    type: 'date',
  },
  duration: {
    label: 'Duration',
    numberOnly: true,
    order: [4, 2],
    placeholder: '# of hours',
    scale: 2,
    type: 'text',
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
    label: 'Employee or vendor',
    order: [0, 0],
    type: 'select',
  },
  end_time: {
    label: 'End time',
    order: [4, 1],
    placeholder: 'HH:MM',
    type: 'text',
  },
  hours_off_duty: {
    label: 'Hours off duty',
    numberOnly: true,
    order: [5, 1],
    placeholder: '5.25',
    required: true,
    scale: 2,
    type: 'text',
  },
  inventory_item_id: {
    label: 'Inventory item',
    order: [1, 1],
    required: true,
    type: 'select',
  },
  start_time: {
    label: 'Start time',
    order: [4, 0],
    placeholder: 'HH:MM',
    type: 'text',
  },
};

export const TABLE_HEADERS = [
  'Name',
  'Customer',
  'Duration',
  'Date',
  '',
];
