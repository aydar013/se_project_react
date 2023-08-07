import React, { useContext } from "react";
import avatarImage from "../images/avatar.svg";
import "../blocks/SideBar.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

const SideBar = ({ handleEditProfile, handleLogOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        {currentUserAvatar ? (
          <img
            src={currentUserAvatar}
            className="sidebar__avatar"
            alt="avatar"
          />
        ) : (
          <div className="sidebar__avatar-letter">{currentUserName?.[0]}</div>
        )}
        <div className="sidebar__name">{currentUserName}</div>
      </div>
      <button
        type="button"
        className="sidebar__edit-profile-button"
        onClick={handleEditProfile}
      >
        Change Profile Data
      </button>
      <button
        type="button"
        className="sidebar__edit-logout-button"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
