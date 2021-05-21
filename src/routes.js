import { Switch, Route } from "react-router-dom";

import Create from "./components/Create";
import Login from "./components/Login";
import Main from "./components/Main";
import Signin from "./components/Signin";
import Post from "./components/Post";

import Auth from "./components/auth/auth";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/create" component={Auth(Create)} />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signin" component={Signin} />
    </Switch>
  );
};

export default Routes;
