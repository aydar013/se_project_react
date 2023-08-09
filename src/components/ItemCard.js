import React, { useContext } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import liked from "../images/liked.svg";
import unliked from "../images/unliked.svg";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(currentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?.data?._id);

  const handleLikeClick = () => {
    onCardLike(item._id, isLiked, currentUser);
  };
  return (
    <div className="card card__section">
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <div className="card__name-wrapper">
        <div className="card__name">{item.name}</div>
        <img
          src={isLiked ? liked : unliked}
          alt="like-icon"
          className="card__like"
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
};

export default ItemCard;
