import React from "react";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={"modal"}>
      <div className="modal__container">
        <button
          className="modal__close-button modal__card-close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__card-image"
          src={selectedCard.link}
          alt={`Photo of ${selectedCard.name}`}
        />
        <div className="modal__card-info">
          <div className="modal__card-name">{selectedCard.name}</div>
          <div className="modal__card-weather">
            Weather type: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
