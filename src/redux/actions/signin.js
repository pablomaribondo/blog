import firebase from "../../firebase/config";

export const createUser = (email, password) => {
  return async dispatch => {
    const user = await firebase
      .signin(email, password)
      .catch(error => console.log(error));
    console.log(user);

    if (user) {
      dispatch({ type: "CREATE_USER", payload: user });

      return user;
    }
  };
};
