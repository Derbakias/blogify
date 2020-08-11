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
      .catch((err) => console.log(err.response));
  };
  return (
    <nav id="nav">
      <div className="nav-wrapper container">
        <div className="logo">
          <h2>Blogify</h2>
        </div>
        <ul className="navlinks">
          <li className="navlink">
            <Link to="/">All</Link>
          </li>
          {user.isAuth && (
            <li className="navlink">
              <Link to="/my-posts">My Posts</Link>
            </li>
          )}
          <li className="navlink">
            <Link to="/about">About </Link>
          </li>
        </ul>
        <div className="user">
          {user.isAuth ? (
            <Fragment>
              <Link to="/create">
                <i className="fas fa-folder-plus"></i>
              </Link>
              <i className="far fa-user-circle">
                {" "}
                {user.username}
              </i>
              <i
                onClick={removeCookie}
                className="fas fa-sign-out-alt"
              >
                Sign Out
              </i>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/login">
                <i className="fas fa-user-lock"> Login</i>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
