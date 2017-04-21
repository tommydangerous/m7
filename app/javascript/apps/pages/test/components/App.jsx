import React from 'react';

// Components
import FetchPostsButton from './FetchPostsButton';
import Posts from './Posts';

export default function App() {
  return (
    <div>
      <FetchPostsButton />

      <h1>Posts:</h1>
      <Posts />
    </div>
  );
}
