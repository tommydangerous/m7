import fetch from 'isomorphic-fetch';

// Actions
import {
  POSTS_FETCH,
  POSTS_RECEIVED,
  POSTS_REMOVE_POST,
  POSTS_REQUESTED,
} from '../actions/posts';

export function fetchPosts(subreddit) {
  return function(dispatch) {
    dispatch(requestedPosts(subreddit));
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivedPosts(subreddit, json)));
  };
}

export function removePost(post) {
  return {
    type: POSTS_REMOVE_POST,
    id: post.id,
  };
}

function dataFromJson(json) {
  return json.data.children.map(child => child.data);
}

function receivedPosts(subreddit, json) {
  return {
    type: POSTS_RECEIVED,
    posts: dataFromJson(json),
    subreddit,
  };
}

function requestedPosts(subreddit) {
  return {
    type: POSTS_REQUESTED,
    subreddit,
  };
}
