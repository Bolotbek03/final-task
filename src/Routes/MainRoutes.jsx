import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/auth/Register/Register";
import Login from "../components/auth/Login/Login";
import Home from "../components/Pages/HomePage/Home";
import Explore from "../components/Pages/ExplorePage/Explore";
import Profile from "../components/Pages/ProfilePage/Profile";

const a = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default a;
