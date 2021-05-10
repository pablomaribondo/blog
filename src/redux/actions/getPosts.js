import firebase from "../../firebase/config";

export const getPosts = () => {
  return async dispatch => {
    const postsArray = await firebase.getPosts();
    dispatch({ type: "GET_POSTS", payload: postsArray });

    return postsArray;
  };
};
