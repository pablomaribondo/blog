import firebase from "../../firebase/config";

export const showPost = postId => {
  return async dispatch => {
    const post = await firebase.showPost(postId);
    dispatch({ type: "SHOW_POST", payload: post });

    return post;
  };
};
