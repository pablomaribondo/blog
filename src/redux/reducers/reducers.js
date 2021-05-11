import { combineReducers } from "redux";

import createUser from "./signin";
import loginUser from "./login";
import logoutUser from "./logout";
import createPost from "./createPost";
import indexPost from "./indexPost";
import showPost from "./showPost";
import updatePost from "./updatePost";
import deletePost from "./deletePost";

const reducers = combineReducers({
  signin: createUser,
  login: loginUser,
  logout: logoutUser,
  createPost: createPost,
  indexPost: indexPost,
  showPost: showPost,
  updatePost: updatePost,
  deletePost: deletePost,
});

export default reducers;
