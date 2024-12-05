import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditUserData.css";

const EditUserData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    dob: "",
    note: "",
  })

  const fetchUserData = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      alert("You are not logged in. Redirecting to login page.")
      navigate("/login")
    }

    try {
      const res = await axios.get("http://localhost:3005/api/getuserData", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data.data) {
        setFormData({
          nickname: res.data.data.nickname || "",
          dob: res.data.data.dob || "",
          note: res.data.data.note || "",
        })
        
      } else {
        alert("No data found to edit. Redirecting to profile.");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Redirecting to profile.");
      navigate("/profile");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3005/api/edituserData",{ ...formData },
        {headers: { Authorization: `Bearer ${token}` },}
      );

      if (res.status === 200) {
        alert("Data updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update data. Please try again.");
    }
  };

  return (
    <div className="edit-data-container">
      <form className="edit-data-form" onSubmit={handleSubmit}>
        <h2>Edit Your Details</h2>
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
        <button type="submit" className="submit-button">
          Update Data
        </button>
      </form>
    </div>
  );
};

export default EditUserData;
