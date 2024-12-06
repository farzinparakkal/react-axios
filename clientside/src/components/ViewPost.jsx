import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewUserPost.css";

const ViewPost = () => {
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
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }

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
    </div>
  );
};

export default ViewPost