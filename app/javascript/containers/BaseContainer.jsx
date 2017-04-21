import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
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

Root.propTypes = {
  app: PropTypes.object.isRequired,
};
