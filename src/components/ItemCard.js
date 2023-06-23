import React from "react";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <div className="card__name-wrapper">
        <div className="card__name">{item.name}</div>
      </div>
    </div>
  );
};

export default ItemCard;
