import React from "react";
import "../blocks/ClothesSection.css";
import ItemCard from "./ItemCard";

const ClothesSection = ({ openModal }) => {
  return (
    <div className="clothes">
      <div className="clothes__title">Your items</div>
      <button className="clothes__button" type="button" onClick={openModal}>
        + Add new
      </button>
      {/* <ul className="clothes__list">
        {cards.map((item) => (
          <ItemCard
            key={item.id || item._id}
            item={item}
            onSelectCard={onSelectCard}
          />
        ))}
      </ul> */}
    </div>
  );
};

export default ClothesSection;
