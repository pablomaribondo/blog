import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { indexPost } from "../redux/actions";
import image from "../assets/image.svg";

const Main = () => {
  const indexPostSelector = useSelector(state => state.indexPost);

  const dispatch = useDispatch();

  const indexPostAction = () => dispatch(indexPost());

  useEffect(() => {
    indexPostAction();
  }, []); // eslint-disable-line

  return (
    <>
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
        <img src={image} alt="React Redux" />
      </header>

      <div className="posts">
        {indexPostSelector.posts.map(post => (
          <div className="post" key={post.id}>
            <Link to={`post/${post.id}`}>
              <div
                className="post-image"
                style={{ backgroundImage: `url(${post.data.cover})` }}
              ></div>
              <p className="post-title">{post.data.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
