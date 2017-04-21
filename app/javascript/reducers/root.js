import { combineReducers } from 'redux';

// Reducers
import loginReducers from './loginReducers';
import postReducers from './postReducers';

export default combineReducers({
  login: loginReducers,
  posts: postReducers,
});
