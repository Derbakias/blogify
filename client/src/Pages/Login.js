import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { StateContext } from "../Context/StateProvider";
import axios from "axios";

function Login() {
  const { user, setUser } = useContext(StateContext);
  let history = useHistory();
  useEffect(() => {
    axios
      .get("/api/auth")
      .then(({ data }) => {
        setUser({
          username: data.username,
          user_id: user._id,
          isAuth: true,
        });
        history.push("/");
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  const [error, setError] = useState("");
  const registerData = (e) => {
    e.preventDefault();
    // login the user
    axios
      .post("/api/auth", {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((res) => {
        setUser((prev) => ({
          username: res.username,
          user_id: res._id,
          isAuth: true,
        }));

        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setError(err.response.data.msg);
        const resetError = setInterval(() => {
          setError("");
          clearInterval(resetError);
        }, 2000);
      });
    e.target.reset();
  };
  return (
    <div className="login-container">
      <form
        onSubmit={registerData}
        className="login-wrapper"
      >
        <h2>Login</h2>
        <div className="error-message">
          <h3>{error}</h3>
        </div>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="login-email"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          name="password"
          id="login-password"
        />
        <div className="register box">
          <p>New User?</p>
          <Link to="/register"> Register</Link>
        </div>
        <button type="submit" className="btn login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
