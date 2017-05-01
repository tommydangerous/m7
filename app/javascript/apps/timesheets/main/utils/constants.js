import moment from 'moment';

const now = moment();
const minYear = now.add(-5, 'year');
const minDate = new Date(minYear.year(), 0, 0);

export const CREATE_FORM_FIELDS = {
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
