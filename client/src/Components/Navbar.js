import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../Context/StateProvider";

function Navbar() {
  const { user } = useContext(StateContext);

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
              <i className="far fa-user-circle">
                {" "}
                {user.username}
              </i>
              <i className="fas fa-sign-out-alt">
                {" "}
                Sign Out
              </i>
            </Fragment>
          ) : (
            <Fragment>
              <i className="fas fa-user-lock"> Login</i>
              <i className="fas fa-user-plus"> Register</i>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
