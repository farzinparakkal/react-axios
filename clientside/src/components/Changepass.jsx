import React, { useState } from "react";
import "./Changepass.css";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    pwd: "",
    cpwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Password changed successfully:", formData.newPassword);
    // Add logic for API integration
  };

  return (
    <div className="change-pass-container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
          <input  type="password"  name="pwd" value={formData.newPassword} onChange={handleChange} required placeholder="Enter new password"/>
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input  type="password"  name="cpwd"  value={formData.confirmPassword}onChange={handleChange}  required  placeholder="Confirm new password"  />
        </div>
        <button type="submit" className="btn-change-password">  Change Password </button>
      </form>
    </div>
  );
};

export default ChangePass;
