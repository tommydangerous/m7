import { Provider } from 'react-redux';
import React from 'react';

// Stores
import store from '../stores/store';

// Components
import App from '../components/App';

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
