import React, { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../Context/StateProvider";

function Navbar() {
  const history = useHistory();
  const { user, setUser } = useContext(StateContext);

  const removeCookie = (e) => {
    console.log("logout");
    axios
      .get("/api/auth/logout")
      .then((res) => {
        setUser({
          username: "",
          user_id: "",
          isAuth: false,
        });
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.response);
        history.push("/login");
      });
  };
  let authStyle;
  let nonAuthStyle;
  if (user.isAuth) {
    authStyle = { visibility: "visible" };
    nonAuthStyle = { visibility: "hidden" };
  } else {
    authStyle = { visibility: "hidden" };
    nonAuthStyle = { visibility: "visible" };
  }

  return (
    <nav id="nav">
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/">
            <h2>Blogify</h2>
          </Link>
        </div>
        <ul className="navlinks">
          <li className="navlink">
            <Link to="/">All</Link>
          </li>
          <li style={authStyle} className="navlink">
            <Link to="/my-posts">My Posts</Link>
          </li>
          <li className="navlink">
            <Link to="/about">About </Link>
          </li>
        </ul>
        <div style={authStyle} className="user">
          <Fragment>
            <Link style={authStyle} to="/create">
              <i className="fas fa-folder-plus"></i>
            </Link>
            <i
              style={authStyle}
              className="far fa-user-circle"
            >
              {" "}
              {user.username}
            </i>
            <Link style={nonAuthStyle} to="/login">
              <i className="fas fa-user-lock"> Login</i>
            </Link>
            <i
              style={authStyle}
              onClick={removeCookie}
              className="fas fa-sign-out-alt"
            >
              Sign Out
            </i>
          </Fragment>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
