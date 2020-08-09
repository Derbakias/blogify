import React, { useState, createContext } from "react";

const StateContext = createContext();

function StateProvider(props) {
  const [user, setUser] = useState({
    username: "derbakias",
    user_id: "derbakias21",
    isAuth: true,
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "derbakias",
      title: "First Post",
      body:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem laudantium nulla a, rem eveniet itaque dolor placeat inventore dicta cumque voluptates sequi nihil, quia perspiciatis! Beatae sint aliquid incidunt dolorum reiciendis quo mollitia ab dolor explicabo! Doloremque unde debitis eos aliquam asperiores doloribus consequuntur velit esse, ut eligendi explicabo tenetur?",
      type: "private",
      date: "2 days ago",
    },
  ]);

  return (
    <StateContext.Provider
      value={{ user, setUser, posts, setPosts }}
    >
      {props.children}
    </StateContext.Provider>
  );
}

export default StateProvider;
export { StateContext };
