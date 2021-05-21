import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { loginUser } from "../redux/actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [routeRedirect, setRouteRedirect] = useState(false);

  const dispatch = useDispatch();

  const loginUserAction = (userEmail, userPassword) =>
    dispatch(loginUser(userEmail, userPassword));

  const loginHandler = async event => {
    event.preventDefault();

    if (email.length > 0 && password.length > 0) {
      const user = await loginUserAction(email, password);
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
    <>
      <form onSubmit={loginHandler}>
        <p>WELCOME BACK</p>
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

        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
