import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const UserProfile = () => {
  // Pull values directly from context
  const { name, age, bio } = useContext(UserContext);

  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Bio: {bio}</p>
    </div>
  );
};

export default UserProfile;
