import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import ProfileItem from "./ProfileItem";
// import ProfileItem from "./ProfilItem";

const ProfileList = ({ elem }) => {
  const { profiles, getProfiles } = useAuth();

  return (
    <div>
      {profiles.map((elem) => (
        <ProfileItem elem={elem} key={elem.id} />
      ))}
    </div>
  );
};

export default ProfileList;
