import firebase from "../../firebase/config";

export const updatePost = (postId, postData) => {
  return async dispatch => {
    const post = await firebase
      .updatePost(postId, postData)
      .catch(error => console.log(error));

    if (post) {
      dispatch({ type: "UPDATE_POST", payload: post });

      return post;
    }
  };
};
