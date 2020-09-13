import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StateContext } from "../Context/StateProvider";

function Create(props) {
  const { user, setUser } = useContext(StateContext);
  const [fullPost, setFullPost] = useState({});
  let history = useHistory();
  useEffect(() => {
    // check if user is authenticated
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
    // eslint-disable-next-line
  }, []);
  const createPost = (e) => {
    e.preventDefault();
    const updatedObj = {
      title: e.target[0].value,
      body: e.target[1].value,
      type: e.target[2].checked ? "private" : "public",
    };
    axios
      .post("/api/posts/", updatedObj)
      .then((res) => {
        history.push("/blogify");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  return (
    <form
      onSubmit={createPost}
      className="full-view"
      id="edit-form"
    >
      <h2>Add A Post</h2>
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
        <button
          onClick={() => history.push("/blogify")}
          className="btn"
        >
          Cancel
        </button>
        <button type="submit" className="btn">
          Create
        </button>
      </div>
    </form>
  );
}

export default Create;
