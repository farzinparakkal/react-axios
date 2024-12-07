import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: localStorage.getItem("email") || "",
    pwd: "",
    cpwd: "",
    pic: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, pic: reader.result }); // Save Base64 string
        setPreviewImage(reader.result); // Set preview image
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    
    try {
      const res = await axios.post("http://localhost:3005/api/adduser", formData);
      if (res.status === 201) {
        alert(res.data.msg);
        localStorage.removeItem("email");
        navigate("/login");
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
 };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create an Account</h1>
          <p>Fill in the details below to get started</p>
        </div>
        <form onSubmit={handleSubmit} method="post">
          <div className="form-group">
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile Preview"
                style={{ marginTop: "10px", width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="cpwd"
              value={formData.cpwd}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
