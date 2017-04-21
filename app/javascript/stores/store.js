import { applyMiddleware, compose, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import rootReducer from '../reducers/rootReducer';

const loggerMiddleware = createLogger();
const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
  devToolsEnhancer(),
);

const store = createStore(rootReducer, {}, enhancer);

export default store;
