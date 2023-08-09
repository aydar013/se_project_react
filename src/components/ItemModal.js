import React, { useContext, useEffect } from "react";
import "../blocks/ItemModal.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ItemModal = ({
  selectedCard,
  handleCloseModal,
  onOpenDeleteModal,
  isOpen,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = selectedCard.owner === currentUser?.data?._id;

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="modal">
      <div className="modal__container">
        <button
          className="modal__close-button modal__card-close"
          type="button"
          onClick={handleCloseModal}
        />
        <img
          className="modal__card-image"
          src={selectedCard.link || selectedCard.imageUrl}
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
            {isOwn ? (
              <button
                type="button"
                onClick={onOpenDeleteModal}
                className="modal__card-delete"
              >
                Delete item
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
