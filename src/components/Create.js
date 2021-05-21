import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { createPost } from "../redux/actions";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [routeRedirect, setRouteRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const createPostAction = post => dispatch(createPost(post));

  const addPostHandler = async event => {
    event.preventDefault();

    setLoading(true);

    const post = {
      title,
      content,
      cover,
    };

    await createPostAction(post);
    setLoading(false);
    setRouteRedirect(true);
  };

  const renderForm = () => {
    if (loading) {
      return (
        <div className="processing">
          <p>Request is being processed</p>
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      return (
        <form onSubmit={addPostHandler}>
          <p>CREATE A NEW POST</p>

          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            name="title"
            onChange={({ target: { value } }) => setTitle(value)}
            value={title}
          />

          <label htmlFor="content">Post Content:</label>
          <textarea
            name="content"
            onChange={({ target: { value } }) => setContent(value)}
            value={content}
          ></textarea>

          <label htmlFor="cover" className="cover">
            Post Cover
          </label>
          <input
            type="file"
            onChange={({ target: { files } }) => setCover(files[0])}
          />

          <input type="submit" value="Create Post" />
        </form>
      );
    }
  };

  return routeRedirect ? <Redirect to="/" /> : renderForm();
};

export default Create;
