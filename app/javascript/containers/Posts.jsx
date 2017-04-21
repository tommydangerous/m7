import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import * as postActionCreators from '../action_creators/posts';

import Post from '../components/Post';

const mapStateToProps = state => ({
  loading: state.loading,
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActionCreators, dispatch),
});

function Posts({ postActions, posts }) {
  const {
    loading,
    posts: items,
  } = posts;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <button onClick={() => postActions.fetchPosts('reactjs')}>
        Fetch
      </button>

      {items && (
        <ol>
          {items.map(post => <Post key={post.id} post={post} />)}
        </ol>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
