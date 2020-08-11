import React, { useContext } from "react";
import { StateContext } from "../Context/StateProvider";
import Post from "../Components/Post";

function MyPosts() {
  const { posts, user } = useContext(StateContext);
  let post = [];
  posts.forEach((myPost) => {
    if (myPost.author === user.username) {
      post.push(myPost);
    }
  });
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
