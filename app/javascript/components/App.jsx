import React from 'react';

// Components
import FetchPostsButton from '../containers/FetchPostsButton';
import Posts from '../containers/Posts';

export default function App() {
  return (
    <div>
      <FetchPostsButton />

      <h1>Posts:</h1>
      <Posts />
    </div>
  );
}
