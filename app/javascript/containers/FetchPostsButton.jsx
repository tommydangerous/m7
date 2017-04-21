import { connect } from 'react-redux';
import React from 'react';

// Action Creators
import { fetchPosts } from '../action_creators/posts';

function FetchPostsButton({ dispatch }) {
  const onClick = () => {
    dispatch(fetchPosts('reactjs'));
  };

  return (
    <button onClick={onClick}>
      Fetch Posts
    </button>
  );
}

export default connect()(FetchPostsButton);
