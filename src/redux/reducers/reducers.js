import { combineReducers } from "redux";

import createUser from "./signin";
import loginUser from "./login";
import logoutUser from "./logout";
import createPost from "./create";
import getPosts from "./getPosts";

const reducers = combineReducers({
  signin: createUser,
  login: loginUser,
  logout: logoutUser,
  create: createPost,
  posts: getPosts,
});

export default reducers;
