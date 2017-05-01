import { combineReducers } from 'redux';

// Reducers
import customerReducers from './customerReducers';
import employeeReducers from './employeeReducers';
import expenseReducers from './expenseReducers';
import expensegroupingReducers from './expensegroupingReducers';
import inventoryitemReducers from './inventoryitemReducers';
import loginReducers from './loginReducers';
import modalReducers from './modalReducers';
import qbaccountReducers from './qbaccountReducers';
import qbclassReducers from './qbclassReducers';
import timesheetReducers from './timesheetReducers';
import vendorReducers from './vendorReducers';

export default combineReducers({
  customer: customerReducers,
  employee: employeeReducers,
  expense: expenseReducers,
  expensegrouping: expensegroupingReducers,
  inventoryitem: inventoryitemReducers,
  login: loginReducers,
  modal: modalReducers,
  qbaccount: qbaccountReducers,
  qbclass: qbclassReducers,
  timesheet: timesheetReducers,
  vendor: vendorReducers,
});
