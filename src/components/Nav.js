import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";

import firebase from "../firebase/config";

import { logoutUser } from "../redux/actions/logout";

const Nav = () => {
  const loginSelector = useSelector(state => state.login);
  const signinSelector = useSelector(state => state.signin);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUserAction = () => dispatch(logoutUser());

  useEffect(() => {
    firebase.getUserState().then(userState => setUser(userState));
  });

  const logoutHandler = async () => {
    console.log("logout user");
    setUser(null);
    await logoutUserAction();
    history.replace("/");
  };

  const renderButton = () => {
    if (
      (loginSelector.user && loginSelector.user.hasOwnProperty("user")) ||
      (signinSelector.user && signinSelector.user.hasOwnProperty("user")) ||
      user !== null
    ) {
      return (
        <React.Fragment>
          <li>
            <button className="logout" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </React.Fragment>
      );
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">ReactReduxFirebaseAuth</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/create">new post</Link>
        </li>
        {renderButton()}
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
