import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { createUser } from "../redux/actions/signin";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [routeRedirect, setRouteRedirect] = useState(false);

  const dispatch = useDispatch();

  const createUserAction = (userEmail, userPassword) =>
    dispatch(createUser(userEmail, userPassword));

  const signinHandler = async event => {
    event.preventDefault();

    if (email.length > 0 && password.length > 0) {
      const user = await createUserAction(email, password);

      if (user) {
        setRouteRedirect(true);
      }
    } else {
      console.log("Need to fill the credentials!");
    }
  };

  return routeRedirect ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>
      <form onSubmit={signinHandler}>
        <p>Create an account</p>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          onChange={({ target: { value } }) => setEmail(value)}
          value={email}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          onChange={({ target: { value } }) => setPassword(value)}
          value={password}
        />

        <input type="submit" value="Create account" />
      </form>
    </React.Fragment>
  );
};

export default Signin;
