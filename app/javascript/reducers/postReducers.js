// Actions
import {
  POSTS_RECEIVED,
  POSTS_REMOVE_POST,
  POSTS_REQUESTED,
} from '../actions/postActions';

// Utils
import { combine } from '../utils/reducer';

const RESET_STATE = {
  loading: false,
};
const INITIAL_STATE = combine(RESET_STATE, {
});

export default function reducers(state = INITIAL_STATE, action) {
  const {
    id,
    posts,
    subreddit,
    type,
  } = action;

  switch (type) {
    case POSTS_RECEIVED: {
      return combine(combine(state, RESET_STATE), {
        posts,
        subreddit,
      });
    }
    case POSTS_REMOVE_POST: {
      return combine(combine(state, RESET_STATE), {
        posts: state.posts.filter(post => post.id !== id),
      });
    }
    case POSTS_REQUESTED: {
      return combine(state, {
        loading: true,
        subreddit,
      });
    }
    default: {
      return state;
    }
  }
}
