import "../blocks/Header.css";
import { currentDate } from "../utils/constants";
import logoImage from "../images/logo.svg";
import avatarImage from "../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({
  onCreateModal,
  cityName,
  handleRegistration,
  handleLogin,
  isLoggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo" className="header__logo-picture" />
          </Link>
        </div>
        <div>
          {currentDate}, {cityName}
        </div>
      </div>
      <div className="header__avatar">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="text"
              onClick={onCreateModal}
              className="header__add-button"
            >
              + Add clothes
            </button>

            <Link to="/profile">
              <div className="header__name">{currentUserName}</div>
              {currentUserAvatar ? (
                <img
                  src={currentUserAvatar}
                  alt="avatar"
                  className="header__avatar-picture"
                />
              ) : (
                <div className="header__useravatar-letter">
                  {currentUserName?.[0]}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__register-btn"
              onClick={handleRegistration}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-btn"
              onClick={handleLogin}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
