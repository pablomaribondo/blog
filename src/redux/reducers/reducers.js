import { combineReducers } from "redux";

import createUser from "./signin";
import loginUser from "./login";
import logoutUser from "./logout";

const reducers = combineReducers({
  signin: createUser,
  login: loginUser,
  logout: logoutUser,
});

export default reducers;
