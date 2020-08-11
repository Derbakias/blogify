import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // post the new user data to the api
  const registerData = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    e.target.reset();
    try {
      const response = await fetch(
        "http://localhost:3000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const res = await response.json();
      if (response.status !== 200) {
        setError(res.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (response.status === 200) {
        setSuccess("Succefully Registered! Please Login..");
        setTimeout(() => {
          setSuccess("");
          history.push("/login");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <form
        onSubmit={registerData}
        className="register-wrapper"
      >
        <h2>Register</h2>
        <div className="error-message">
          <h3>{error}</h3>
        </div>
        <div className="success-message">
          <h3>{success}</h3>
        </div>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          name="username"
          id="register-username"
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="register-email"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          name="password"
          id="register-password"
        />
        <div className="register box">
          <p>Already A User?</p>
          <Link to="/login"> Login</Link>
        </div>
        <button type="submit" className="btn register-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
