import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Nav = () => {
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
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
