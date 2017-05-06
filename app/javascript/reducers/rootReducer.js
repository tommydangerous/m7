import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Reducers
import customerReducers from './customerReducers';
import employeeReducers from './employeeReducers';
import expenseReducers from './expenseReducers';
import expensegroupingReducers from './expensegroupingReducers';
import headerReducers from './headerReducers';
import inventoryitemReducers from './inventoryitemReducers';
import loginReducers from './loginReducers';
import modalReducers from './modalReducers';
import qbaccountReducers from './qbaccountReducers';
import qbclassReducers from './qbclassReducers';
import timerReducers from './timerReducers';
import timesheetReducers from './timesheetReducers';
import vendorReducers from './vendorReducers';

export default combineReducers({
  customer: customerReducers,
  employee: employeeReducers,
  expense: expenseReducers,
  expensegrouping: expensegroupingReducers,
  header: headerReducers,
  inventoryitem: inventoryitemReducers,
  login: loginReducers,
  modal: modalReducers,
  qbaccount: qbaccountReducers,
  qbclass: qbclassReducers,
  timer: timerReducers,
  timesheet: timesheetReducers,
  vendor: vendorReducers,
  routing: routerReducer,
});
