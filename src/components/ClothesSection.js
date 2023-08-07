import React, { useContext } from "react";
import "../blocks/ClothesSection.css";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";

const ClothesSection = ({
  cards = [],
  onCreateModal,
  onSelectCard,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = cards.filter((card) =>
    (card.owner === currentUser.data) === undefined
      ? ""
      : currentUser?.data?._id
  );
  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type="button" onClick={onCreateModal}>
        + Add new
      </button>
      <div className="clothes__cards">
        {userItems.map((card, i) => {
          return (
            <ItemCard
              key={i}
              item={card}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              // currentUser={currentUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
