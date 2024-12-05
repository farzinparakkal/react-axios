import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./AddData.css"

const AddData = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nickname: "",
    dob: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,[e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3005/api/adduserData",
        { ...formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        alert("Data added successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add data. Please try again.");
    }
  };

  return (
    <div className="add-data-container">
      <form className="add-data-form" onSubmit={handleSubmit}>
        <h2>Add Your Details</h2>
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <input
            type="text"
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Data</button>
      </form>
    </div>
  );
};

export default AddData;
