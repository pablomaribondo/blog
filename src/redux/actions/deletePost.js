import firebase from "../../firebase/config";

export const getPost = (postId, fileRef) => {
  return async dispatch => {
    const post = await firebase.deletePost(postId, fileRef);
    dispatch({ type: "DELETE_POST", payload: post });

    return post;
  };
};
