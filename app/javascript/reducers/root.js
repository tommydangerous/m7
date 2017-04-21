import { combineReducers } from 'redux';

// Reducers
import postReducers from './postReducers';

export default combineReducers({
  posts: postReducers,
});
