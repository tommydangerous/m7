import { combineReducers } from 'redux';

// Reducers
import loginReducers from './loginReducers';
import expenseReducers from './expenseReducers';
import postReducers from './postReducers';

export default combineReducers({
  expense: expenseReducers,
  login: loginReducers,
  posts: postReducers,
});
