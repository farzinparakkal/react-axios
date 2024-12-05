import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [userDetails, setUserDetails] = useState(null)

  const getUser = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      try {
        const res = await axios.get("http://localhost:3005/api/getuserData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUserDetails(res.data.usr)
          setUserData(res.data.data || null)
        } else {
          navigate("/login")
        }
      } catch (error) {
        console.error(error)
        location.reload()
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

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
        <button>Delete</button>
      </div>
      <div className="right-side">0</div>
    </div>
  )
}

export default Profile
