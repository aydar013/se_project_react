import React from "react";
import "../blocks/ItemModal.css";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  return (
    <div className={"modal"}>
      <div className="modal__container">
        <button
          className="modal__close-button modal__card-close"
          type="button"
          onClick={onClose}
        />
        <img
          className="modal__card-image"
          src={selectedCard.link}
          alt={`Photo of ${selectedCard.name}`}
        />
        <div className="modal__card-info">
          <div>
            <div className="modal__card-name">{selectedCard.name}</div>
            <div className="modal__card-weather">
              Weather type: {selectedCard.weather}
            </div>
          </div>
          <div>
            <div
              className="modal__card-delete"
              onClick={() => onDelete(selectedCard)}
            >
              Delete item
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
