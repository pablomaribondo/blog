import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main";
import Signin from "./components/Signin";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signin" component={Signin}></Route>
    </Switch>
  );
};

export default Routes;
