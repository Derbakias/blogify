import React, { useContext } from "react";
import { StateContext } from "../Context/StateProvider";
import Post from "../Components/Post";

function Home() {
  const { posts } = useContext(StateContext);
  return (
    <section className="home">
      <h1>All The Posts</h1>
      <div className="post-container">
        <Post posts={posts} />
      </div>
    </section>
  );
}

export default Home;
