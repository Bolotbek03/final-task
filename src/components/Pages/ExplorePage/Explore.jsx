import React, { useEffect } from "react";
import { FaSearch, FaCog } from "react-icons/fa"; // Import icons from react-icons library
import "./Explore.css"; // Import your styles
import { useAuth } from "../../context/AuthContextProvider";
import ProfileList from "../../content/Profiles/ProfileList";

const Explore = () => {
  const { getProfiles, profiles } = useAuth();
  useEffect(() => {
    getProfiles();
  }, [profiles]);
  return (
    <div className="explore-container">
      {/* Search input and settings icon */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <FaSearch className="search-icon" />
        <FaCog className="settings-icon" />
      </div>
      <ProfileList />
    </div>
  );
};

export default Explore;
