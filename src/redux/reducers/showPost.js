const showPost = (state = { post: {} }, action) => {
  if (action.type === "SHOW_POST") {
    state = { ...state, post: action.payload };
  }

  return state;
};

export default showPost;
