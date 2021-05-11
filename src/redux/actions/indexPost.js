import firebase from "../../firebase/config";

export const indexPost = () => {
  return async dispatch => {
    const postsArray = await firebase.indexPost();
    dispatch({ type: "INDEX_POST", payload: postsArray });

    return postsArray;
  };
};
