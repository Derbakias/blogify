import React, { useState, createContext } from "react";

const StateContext = createContext();

function StateProvider(props) {
  const [user, setUser] = useState({
    username: "",
    user_id: "",
    isAuth: false,
  });

  const [posts, setPosts] = useState([]);

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
