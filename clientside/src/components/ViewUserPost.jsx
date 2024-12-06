import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewUserPost.css";

const ViewUserPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/getPost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPost(res.data.post);
      } else {
        alert("Failed to fetch post data.");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      navigate("/profile");
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(`http://localhost:3005/api/deletePost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        alert(res.data.msg);
        navigate("/profile");
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Try again.");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="view-post-container">
      <h2>Post Details</h2>
      <div className="post-details">
        <div className="post-images">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="post-image"
            />
          ))}
        </div>
        <div className="post-info">
          <h3>{post.caption}</h3>
          <p>{post.description}</p>
          <p>
            <strong>Date:</strong> {post.date}
          </p>
          <p>
            <strong>Time:</strong> {post.time}
          </p>
        </div>
      </div>
      <div className="post-actions">
        <button onClick={() => navigate(`/editPost/${id}`)}>Edit</button>
        <button onClick={deletePost}>Delete</button>
      </div>
    </div>
  );
};

export default ViewUserPost