// Profile.js
import React from "react";
import { FaUser } from "react-icons/fa";
import "./Profile.css";
import { useAuth } from "../../context/AuthContextProvider";

const Profile = () => {
  const { myProfile } = useAuth();

  return (
    <div className="profile-container">
      {myProfile && (
        <div className="user-info">
          <FaUser className="user-icon" />
          <img src={myProfile.icon} alt="" />
          <div>
            <h2>
              {myProfile.first_name} {myProfile.last_name}
            </h2>
            <p>{myProfile.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

{
  /*
  <h3>Posts</h3>
  <div className="user-posts">
</div> */
}
