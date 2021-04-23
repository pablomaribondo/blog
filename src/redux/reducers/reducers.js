import { combineReducers } from "redux";

import createUser from "./signin";

const reducers = combineReducers({
  signIn: createUser,
});

export default reducers;
