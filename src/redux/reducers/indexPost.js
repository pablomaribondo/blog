const indexPosts = (state = { posts: [] }, action) => {
  if (action.type === "INDEX_POST") {
    state = { ...state, posts: action.payload };
  }

  return state;
};

export default indexPosts;
