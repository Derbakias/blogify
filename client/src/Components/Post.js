import React from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";

function Post({ posts }) {
  // cut the body text on preview
  const cutBodyText = (text) => {
    const randomNumber = Math.floor(
      Math.random() * (20 - 5 + 1) + 8
    );
    const splittedText = text.split(" ");
    return splittedText.slice(0, randomNumber).join(" ");
  };

  const grid = posts.map((post) => (
    <div className="post-card">
      <Link
        to={{
          pathname: "/full-view/" + post.id,
          id: post.id,
          postData: post,
        }}
      >
        <h3>{post.title}</h3>
        <p className="body">{cutBodyText(post.body)}...</p>
        <hr />
        <div className="post-info">
          <p>{`By ${post.author}`}</p>
          <p>{post.date}</p>
        </div>
      </Link>
    </div>
  ));

  return (
    <Masonry
      breakpointCols={{ default: 3, 1024: 2, 700: 1 }}
      className="post-grid"
      columnClassName="post-grid_column"
    >
      {grid}
    </Masonry>
  );
}

export default Post;
