import { Provider } from 'react-redux';
import React from 'react';

// Stores
import store from '../stores/store';

export default function Root({ app }) {
  return (
    <Provider store={store}>
      {app}
    </Provider>
  );
}
