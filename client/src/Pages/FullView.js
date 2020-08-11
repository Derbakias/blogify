import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StateContext } from "../Context/StateProvider";

function FullView(props) {
  const { user, setUser } = useContext(StateContext);
  const [fullPost, setFullPost] = useState({});
  let history = useHistory();
  const url_id = props.match.params.postID;
  useEffect(() => {
    // check if your is auth
    axios
      .get("/api/auth")
      .then(({ data }) =>
        setUser({
          username: data.username,
          user_id: user._id,
          isAuth: true,
        })
      )
      .catch((err) => console.log(err.response.data.msg));
    // get the individual post
    axios
      .get(`/api/posts/${url_id}`)
      .then(({ data }) => {
        setFullPost(data);
      })
      .catch((err) => console.log(err.response.data.msg));
    // eslint-disable-next-line
  }, []);
  const [edit, setEdit] = useState(false);
  const updatePost = (e) => {
    e.preventDefault();
    const updatedObj = {
      title: e.target[0].value,
      body: e.target[1].value,
      type: e.target[2].checked ? "private" : "public",
    };
    axios
      .put(`/api/posts/${url_id}`, updatedObj)
      .then((res) => {
        setEdit(false);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  const removePost = () => {
    alert("Are you sure?");
    // remove a post
    axios
      .delete(`/api/posts/${url_id}`)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  if (edit) {
    return (
      <form
        onSubmit={updatePost}
        className="full-view"
        id="edit-form"
      >
        <h2>Edit Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Enter Title.."
          value={fullPost.title}
          className="edit title"
          onChange={(e) => {
            const value = e.target.value;
            setFullPost((prev) => ({
              ...prev,
              title: value,
            }));
          }}
        />
        <textarea
          name="body"
          rows="10"
          placeholder="Enter Post Text.."
          className="edit body"
          defaultValue={fullPost.body}
          onChange={(e) => {
            const value = e.target.value;
            setFullPost((prev) => ({
              ...prev,
              body: value,
            }));
          }}
        ></textarea>
        <h4 className="privacy-title">Privacy Settings</h4>
        <div className="privacy-wrapper">
          <label htmlFor="private">Private</label>
          <input
            type="radio"
            name="privacy"
            value="private"
            id="private"
            defaultChecked
          />
          <label htmlFor="public">Public</label>
          <input
            type="radio"
            name="privacy"
            value="public"
            id="public"
          />
        </div>
        <div className="post-info">
          <button className="btn">Cancel</button>
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <div className="full-view">
        <div className="header-wrapper">
          <h3>{fullPost.title}</h3>
          {fullPost.author === user.username && (
            <div className="edit-icons">
              <i
                className="far fa-edit"
                onClick={(e) => {
                  setEdit(true);
                }}
              ></i>
              <i
                onClick={removePost}
                className="fas fa-trash-alt"
              ></i>
            </div>
          )}
        </div>
        <p className="body">{fullPost.body}</p>
        <hr />
        <div className="post-info">
          <p>{`By ${fullPost.author}`}</p>
          <p>{moment(fullPost.date).fromNow()}</p>
        </div>
      </div>
    );
  }
}

export default FullView;
