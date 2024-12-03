import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ChangePass from "./components/Changepass"
import Verify from "./components/Verify"
import Register from "./components/Register"
import Login from "./components/Login"
import HomePage from "./components/Homepage"
import Nav from "./components/Nav"
import Profile from "./components/Profile"

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/changepass" element={<ChangePass />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
