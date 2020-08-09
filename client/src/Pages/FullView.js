import React, { useContext } from "react";
import { StateContext } from "../Context/StateProvider";

function FullView(props) {
  const { posts } = useContext(StateContext);
  const post_id = props.match.params.postID;
  const post = posts.filter((post) => {
    if (post.id.toString() === post_id.toString()) {
      return post;
    }
  });
  return (
    <div>
      <h1>This is full view</h1>
      <h1>{post[0].title}</h1>
    </div>
  );
}

export default FullView;
