// ProfileItem.jsx
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "./ProfilItem.css"; // Importing styles
import { useAuth } from "../../context/AuthContextProvider";

const ProfileItem = ({ elem }) => {
  const { getProfiles, profiles } = useAuth();
  useEffect(() => {
    getProfiles();
  }, [profiles]);
  return (
    <div className="profile-item">
      <div className="user-icon">
        <img src={elem.icon} alt="" />
      </div>
      <div className="user-info">
        <p className="username">{elem.last_name}</p>
      </div>
    </div>
  );
};

export default ProfileItem;
