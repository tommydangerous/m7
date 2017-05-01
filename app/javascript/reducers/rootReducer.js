import { combineReducers } from 'redux';

// Reducers
import customerReducers from './customerReducers';
import expenseReducers from './expenseReducers';
import loginReducers from './loginReducers';
import modalReducers from './modalReducers';
import vendorReducers from './vendorReducers';

export default combineReducers({
  customer: customerReducers,
  expense: expenseReducers,
  login: loginReducers,
  modal: modalReducers,
  vendor: vendorReducers,
});
