import React, { useContext } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import liked from "../images/liked.svg";
import unliked from "../images/unliked.svg";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(currentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?.data?._id);

  const itemLikeButtonClassName = `cards__like-button ${
    isLoggedIn ? "cards__like-button_active" : "cards__like-button_inactive"
  }`;

  const renderUnliked = () => {
    return (
      <button
        className={itemLikeButtonClassName}
        onClick={() => onCardLike(item._id, isLiked)}
      >
        <img className="card__like" src={unliked} alt="card is liked already" />
      </button>
    );
  };
  const renderLiked = () => {
    return (
      <button
        className={itemLikeButtonClassName}
        onClick={() => onCardLike(item._id, isLiked)}
      >
        <img className="card__like" src={liked} alt="card is liked" />
      </button>
    );
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
        onClick={() => onSelectCard(item, isLiked)}
      />
      <div className="card__name-wrapper">
        <div className="card__name">{item.name}</div>
        {isLiked ? renderLiked() : renderUnliked()}
      </div>
    </div>
  );
};

export default ItemCard;
