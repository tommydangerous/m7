import { combineReducers } from 'redux';

// Reducers
import loginReducers from './loginReducers';
import expenseReducers from './expenseReducers';
import modalReducers from './modalReducers';
import postReducers from './postReducers';

export default combineReducers({
  expense: expenseReducers,
  login: loginReducers,
  modal: modalReducers,
  posts: postReducers,
});
