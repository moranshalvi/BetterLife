import React, { useEffect } from "react";
import { userService } from "../services/user.service";

export const UserPreview = (props) => {
  const loggedInUser = userService.getLoggedinUser();
  const { user } = props;

  useEffect(() => {}, [loggedInUser]);

  if(user.id === loggedInUser.id) return;
  
  const remove = async (user) => {
    await userService.remove(user);
  };

  return (
    <div className="checksome">
      <a className="first_last">
        Name: {user.firstName} {user.lastName}
      </a>
      <a className="email">Email: {user.email}</a>
      <a className="phon">Phone Number: {user.phoneNumber}</a>
      <a className="city">City: {user.city}</a>
      <a className="userType">User Type: {user.userType}</a>
      {user.userType === "Therapist" && (<a className="confirmation">confirmation: {user.confirmation}</a>)}
      <button className="delete_confirmation" onClick={() => remove(user)}>
        delete
      </button>
    </div>
  );
};
