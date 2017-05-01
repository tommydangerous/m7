import { combineReducers } from 'redux';

// Reducers
import loginReducers from './loginReducers';
import expenseReducers from './expenseReducers';
import modalReducers from './modalReducers';
import vendorReducers from './vendorReducers';

export default combineReducers({
  expense: expenseReducers,
  login: loginReducers,
  modal: modalReducers,
  vendor: vendorReducers,
});
