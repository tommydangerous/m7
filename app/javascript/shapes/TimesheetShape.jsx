import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  account_id: PropTypes.string,
  account_user_id: PropTypes.string,
  approved: PropTypes.string,
  billable: PropTypes.bool,
  created: PropTypes.string,
  customer_id: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  employee_id: PropTypes.string,
  end_time: PropTypes.string,
  exported: PropTypes.string,
  hours_off_duty: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  inventory_item_id: PropTypes.string,
  modified: PropTypes.string,
  payroll_item_id: PropTypes.string,
  project: PropTypes.string,
  qb_class_id: PropTypes.string,
  start_time: PropTypes.string,
  transaction_id: PropTypes.string,
  type: PropTypes.string,
});
