import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get("http://localhost:3005/api/getuserData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUserDetails(res.data.usr);
          setUserData(res.data.data || null);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("/login");
      }
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/getPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.delete("http://localhost:3005/api/deleteData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          alert(res.data.msg);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("/login");
      }
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <form>
          <div className="form-group">
            <div className="image">
              <img src="" alt="" />
            </div>
            <div>Username: {userDetails?.username}</div>
            <div>Email: {userDetails?.email}</div>
          </div>
        </form>
        {userData ? (
          <>
            <div>
              <div>Nickname: {userData.nickname}</div>
              <div>Date of Birth: {userData.dob}</div>
              <div>Note: {userData.note}</div>
            </div>
            <Link to={"/editUserData"}>
              <button>Edit</button>
            </Link>
          </>
        ) : (
          <>
            <div>Note: Not added, need to create !</div>
            <Link to={"/addData"}>
              <button>Create</button>
            </Link>
          </>
        )}
        <button onClick={handleClick}>Delete</button>
      </div>
      <div className="right-side">
        <Link to={"/addPost"}>
          <button>Add Post</button>
        </Link>
        {posts.length === 0 ? (
          <div>No post added</div>
        ) : (
          posts.map((post, index) => (
            <div key={index}>
              <img
                src={posts[0].images[0]}
                alt="First Post"
                className="post-image"
              />
              <Link to={`/viewUserPost/${post._id}`}>
              <button>View</button>
              </Link>
              </div>
              ))
              )}
      </div>
    </div>
  );
};

export default Profile;
