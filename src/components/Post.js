import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import { showPost, updatePost, deletePost } from "../redux/actions";

import firebase from "../firebase/config";

const Post = () => {
  const login = useSelector(state => state.login);
  const signin = useSelector(state => state.signin);
  const post = useSelector(state => state.showPost);

  const [timer, setTimer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [userState, setUserState] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [postId, setPostId] = useState("");
  const [routeRedirect, setRouteRedirect] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const showPostAction = postIdValue => dispatch(showPost(postIdValue));
  const updatePostAction = (postIdValue, postValue) =>
    dispatch(updatePost(postIdValue, postValue));
  const deletePostAction = (postIdValue, filerefValue) =>
    dispatch(deletePost(postIdValue, filerefValue));

  useEffect(() => {
    setTimer(true);

    setPostId(id);
    showPostAction(id);

    firebase.getUserState().then(user => {
      if (user) {
        setUserState(user);
      }
    });

    setTimeout(() => setTimer(false), 1000);

    return () => {
      dispatch({ type: "SHOW_POST", payload: {} });
    };
  }, []); // eslint-disable-line

  const updatePostHandler = async event => {
    event.preventDefault();
    setIsBusy(true);

    const postData = {
      id: postId,
      title,
      content,
    };

    if (cover) {
      postData.cover = cover;
      postData.oldcover = post.post.fileref;
    }

    console.log(postData);
    await updatePostAction(postId, postData);
    setIsBusy(false);
    setRouteRedirect(true);
  };

  const editPostHandler = () => {
    if (!editMode) {
      setTitle(post.post.title);
      setContent(post.post.content);
      setCover(post.post.fileref);
    }

    setEditMode(!editMode);
  };

  const deletePostHandler = async () => {
    await deletePostAction(postId, cover);
    setRouteRedirect(true);
  };

  const renderDeleteButton = () => {
    if (
      editMode &&
      (login.user.hasOwnProperty("user") ||
        signin.user.hasOwnProperty("user") ||
        (userState !== null && isBusy === false))
    ) {
      return (
        <button className="delete" onClick={deletePostHandler}>
          Delete Post
        </button>
      );
    }
  };

  const renderUpdateForm = () => {
    if (editMode) {
      if (isBusy) {
        return (
          <div className="processing">
            <p>Request is beign processed</p>
            <div className="loader">Loading...</div>
          </div>
        );
      } else {
        return (
          <>
            <form className="editForm" onSubmit={updatePostHandler}>
              <p>Update the current post</p>

              <label htmlFor="title">Post title:</label>
              <input
                type="text"
                name="title"
                onChange={({ target: { value } }) => setTitle(value)}
                value={title}
              />

              <label htmlFor="content">Post content:</label>
              <textarea
                name="content"
                onChange={({ target: { value } }) => setContent(value)}
                value={content}
              ></textarea>

              <label htmlFor="cover" className="cover">
                Cover
              </label>
              <input
                type="file"
                onChange={({ target: { files } }) => setCover(files[0])}
              />

              <input type="submit" value="Update Post" />
            </form>
          </>
        );
      }
    }
  };

  const renderEditButton = () => {
    if (
      !timer &&
      (login.user.hasOwnProperty("user") ||
        signin.user.hasOwnProperty("user") ||
        userState !== null)
    ) {
      return (
        <button className="edit" onClick={editPostHandler}>
          Edit Post
        </button>
      );
    }
  };

  const renderPost = () => {
    if (timer) {
      return <div className="loader">Loading...</div>;
    } else if (
      login.user.hasOwnProperty("user") ||
      signin.user.hasOwnProperty("user") ||
      userState !== null
    ) {
      return (
        <div className="single">
          <img src={post.post.cover} alt="Post" />
          <h2>{post.post.title}</h2>
          <p>{post.post.content}</p>

          {renderEditButton()}
          {renderUpdateForm()}
          {renderDeleteButton()}
        </div>
      );
    }
  };

  return routeRedirect ? <Redirect to="/" /> : <>{renderPost()}</>;
};

export default Post;
