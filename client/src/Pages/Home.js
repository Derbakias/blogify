import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { StateContext } from "../Context/StateProvider";
import Post from "../Components/Post";
import axios from "axios";
import Spinner from "../Components/Spinner";

function Home() {
  const {
    posts,
    user,
    setUser,
    setPosts,
    loading,
    setLoading,
  } = useContext(StateContext);
  useEffect(() => {
    axios
      .get("/blogify/api/auth")
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
        }, 350);
      })
      .catch((err) => console.log(err.response.data.msg));
    axios
      .get("/blogify/api/posts")
      .then(({ data }) => {
        setLoading(true);
        setPosts(data);
        const spinning = setTimeout(() => {
          setLoading(false);
          clearTimeout(spinning);
        }, 350);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  const [publicPosts] = useState([]);
  // eslint-disable-next-line
  const publicPost = posts
    // eslint-disable-next-line
    .map((myPost) => {
      if (myPost.type === "public") {
        return myPost;
      }
    })
    // eslint-disable-next-line
    .filter((item) => {
      if (item) {
        return item;
      }
    });

  if (loading) {
    return <Spinner />;
  }

  if (posts.length === 0 || !user.isAuth) {
    return (
      <section className="home">
        <h1>No Posts :(</h1>
      </section>
    );
  } else {
    return (
      <section className="home">
        <h1>All The Posts</h1>
        <div className="post-container">
          <Post posts={user.isAuth ? posts : publicPosts} />
        </div>
      </section>
    );
  }
}

export default Home;
