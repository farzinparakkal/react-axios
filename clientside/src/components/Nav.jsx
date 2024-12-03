import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Nav.css"

const Nav = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = (event) => {
    event.stopPropagation()
    setIsDropdownVisible((prevState) => !prevState)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownVisible(false)
      }
    }

    window.addEventListener("click", handleOutsideClick)
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="right-section">
        <button className="login-button">
          <a href="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </a>
        </button>
        <span className="username">Username</span>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            ▼
          </button>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <a href="/profile">Profile</a>
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
