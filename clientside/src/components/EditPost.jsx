import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.css";

const EditPost = () => {
  const {id}  = useParams()
  console.log(id);
  
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const token = localStorage.getItem("token");

  const getPostDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/getPost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPost(res.data.post);
        setCaption(res.data.post.caption);
        setImages(res.data.post.images || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("caption", caption);
    // newImages.forEach((image) => formData.append("images", image));

    // try {
    //   const res = await axios.put(
    //     `http://localhost:3005/api/updatePost/${postId}`,
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (res.status === 200) {
    //     alert("Post updated successfully!");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <div className="edit-post-container">
      <h1>Edit Post</h1>
        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label htmlFor="caption">Caption:</label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Current Images:</label>
            <div className="current-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Post ${index}`}
                  className="preview-image"
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="images">Add New Images:</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="submit-button">
            Update Post
          </button>
        </form>
    </div>
  );
};

export default EditPost;
