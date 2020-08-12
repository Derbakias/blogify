import React, { useContext, useEffect } from "react";
import axios from "axios";
import { StateContext } from "../Context/StateProvider";
import Post from "../Components/Post";
import Spinner from "../Components/Spinner";

function MyPosts() {
  const {
    posts,
    setPosts,
    user,
    setUser,
    loading,
    setLoading,
  } = useContext(StateContext);
  useEffect(() => {
    axios
      .get("/api/auth")
      .then(({ data }) => {
        setLoading(true);
        setUser({
          username: data.username,
          user_id: user._id,
          isAuth: true,
        });
        const spinning = setTimeout(() => {
          setLoading(false);
          clearTimeout(spinning);
        }, 200);
      })
      .catch((err) => console.log(err.response.data.msg));
    axios
      .get("/api/posts")
      .then(({ data }) => {
        setLoading(true);
        setPosts(data);
        const spinning = setTimeout(() => {
          setLoading(false);
          clearTimeout(spinning);
        }, 200);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);
  let post = [];
  posts.forEach((myPost) => {
    if (myPost.author === user.username) {
      post.push(myPost);
    }
  });

  if (loading) {
    return <Spinner />;
  }

  if (posts.length === 0) {
    return (
      <section className="home">
        <h1>No Posts :(</h1>
      </section>
    );
  }

  return (
    <section className="home">
      <h1>My Posts</h1>
      <div className="post-container">
        <Post posts={post} />
      </div>
    </section>
  );
}

export default MyPosts;
