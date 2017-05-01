import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  account_id: PropTypes.string, // Actually number
  account_user_id: PropTypes.string, // Actually number
  amount: PropTypes.string, // Actually number
  approved: PropTypes.string, // Yes, No... actually bool
  billable: PropTypes.string, // Yes, No... actually bool
  created: PropTypes.string,
  customer_id: PropTypes.string, // Actually number
  date: PropTypes.string,
  description: PropTypes.string,
  expense_grouping_id: PropTypes.string, // Actually number
  exported: PropTypes.string, // Yes, No... actually bool
  id: PropTypes.string, // Actually number
  modified: PropTypes.string,
  qb_account_id: PropTypes.string, // Actually number
  qb_class_id: PropTypes.string, // Actually number
  transaction_id: PropTypes.string, // Actually number
  vendor_id: PropTypes.string, // Actually number
});
