import React from "react";
import avatarImage from "../images/avatar.svg";
import "../blocks/SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img src={avatarImage} className="sidebar__avatar" alt="avatar" />
      <div className="sidebar__name">Aidar Shaidullin</div>
    </div>
  );
};

export default SideBar;
