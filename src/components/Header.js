import "../blocks/Header.css";
import { currentDate } from "../utils/constants";
import logoImage from "../images/logo.svg";
import avatarImage from "../images/avatar.svg";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo" className="header__logo-picture" />
          </Link>
        </div>
        <div>{currentDate}, California</div>
      </div>
      <div className="header__avatar">
        <ToggleSwitch />
        <div>
          <button
            type="text"
            onClick={onCreateModal}
            className="header__add-button"
          >
            + Add clothes
          </button>
        </div>
        <Link to="/profile" className="header__name">
          Aidar Shaidullin
        </Link>
        <div>
          <img
            src={avatarImage}
            alt="avatar"
            className="header__avatar-picture"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
