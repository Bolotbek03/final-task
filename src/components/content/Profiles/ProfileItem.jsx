// ProfileItem.jsx
import React from "react";
import { FaUser } from "react-icons/fa";
import "./ProfilItem.css"; // Importing styles
import still from "../../../icons/still.svg";
const ProfileItem = ({ elem }) => {
  return (
    <div className="profile-item">
      <div className="user-icon">
        <img src={elem.icon} alt="" />
      </div>
      <img src={still} alt="" />
      <div className="user-info">
        <p className="username">{elem.last_name}</p>
      </div>
    </div>
  );
};

export default ProfileItem;
