import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Please log in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <div className="form-footer">
          <Link to={"/#"} className="forgot-password-link">
            Forgot Password?
          </Link>
          <span className="separator">|</span>
          <Link to={"/verify"} className="signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
