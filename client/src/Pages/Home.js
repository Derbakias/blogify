import React, { useContext, useEffect } from "react";
import { StateContext } from "../Context/StateProvider";
import Post from "../Components/Post";
import axios from "axios";

function Home() {
  const { posts, user, setUser, setPosts } = useContext(
    StateContext
  );
  useEffect(() => {
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
    axios
      .get("/api/posts")
      .then(({ data }) => setPosts(data))
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  let publicPosts = [];
  if (!user.isAuth) {
    posts.forEach((myPost) => {
      if (myPost.type === "public") {
        publicPosts.push(myPost);
      }
    });
  }
  return (
    <section className="home">
      <h1>
        {publicPosts.length >= 1 ||
        (posts.length >= 1 && user.isAuth)
          ? "All The Posts"
          : "No Posts"}
      </h1>
      <div className="post-container">
        <Post posts={user.isAuth ? posts : publicPosts} />
      </div>
    </section>
  );
}

export default Home;
