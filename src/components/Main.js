import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts } from "../redux/actions/getPosts";

const Main = () => {
  const getPostsSelector = useSelector(state => state.posts);

  const dispatch = useDispatch();

  const getPostsAction = () => dispatch(getPosts());

  useEffect(() => {
    getPostsAction();
  }, []); // eslint-disable-line

  return (
    <React.Fragment>
      <header>
        <div>
          <h1>
            React Redux <br />
            Hooks Firebase
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dui
            ligula, maximus in purus nec, maximus ultricies nibh.
          </p>
        </div>
      </header>

      <div className="posts">
        {getPostsSelector.posts.map(post => (
          <div className="post" key={post.id}>
            <div style={{ backgroundImage: `url(${post.data.cover})` }}>
              <Link to={`post/${post.id}`}>
                <p>{post.data.title}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Main;
