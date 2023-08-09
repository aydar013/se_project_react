import React, { useContext } from "react";
import "../blocks/ClothesSection.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";

const ClothesSection = ({ cards, onCreateModal, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes">
      <div className="clothes__container">
        <div className="clothes__title">Your items</div>
        <button
          className="clothes__button"
          type="button"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__cards">
        {cards
          .filter(
            (card) =>
              card.owner ===
              (currentUser.data === undefined ? "" : currentUser?.data?._id)
          )
          .map((card) => {
            return (
              <ItemCard
                key={card._id}
                item={card}
                onSelectCard={onSelectCard}
                onCardLike={onCardLike}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ClothesSection;
