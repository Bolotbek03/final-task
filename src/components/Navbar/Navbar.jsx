import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../icons/twitter.svg";
import cat from "../../icons/cat.jpg";
import { useAuth } from "../context/AuthContextProvider";
import { AddPost } from "./AddPost";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, checkAuth, handleLogout, getMyProfile } = useAuth();
  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      checkAuth();
      getMyProfile();
    }
  }, []);
  const handleUserItemClick = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const [addOpenModal, setAddOpenModal] = useState(false);
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-icon">
        <img src={logo} alt="" />
      </div>

      <nav className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/communities">Communities</Link>
        <Link to="/profile">Profile</Link>
        <Link>Premium</Link>
        <Link>More</Link>
      </nav>

      <div className="user-info" onClick={handleUserItemClick}>
        <img src={cat} alt="" />
        <span>{user}</span>
        {isAccordionOpen && (
          <div className="accordion">
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
