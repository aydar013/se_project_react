import "../blocks/Header.css";
import { currentDate } from "../utils/components";
import logoImage from "../images/logo.svg";
import avatarImage from "../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logoImage} alt="logo" className="header__logo-picture" />
        </div>
        <div>{currentDate}, California</div>
      </div>
      <div className="header__avatar">
        <div>
          <button
            type="text"
            onClick={onCreateModal}
            className="header__add-button"
          >
            + Add clothes
          </button>
        </div>
        <div className="header__name">Aidar Shaidullin</div>
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
