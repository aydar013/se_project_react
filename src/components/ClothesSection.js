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
    </div>
  );
};

export default ClothesSection;
