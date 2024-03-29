import React, { useEffect } from "react";
import "../blocks/DeleteCardModal.css";

const DeleteCardModal = ({
  handleCloseModal,
  handleDelete,
  isOpen,
  isLoading,
}) => {
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
      <div className="modal__content modal__content-delete">
        <button
          className="modal__close-button modal__delete-popup-close"
          type="button"
          onClick={handleCloseModal}
        />
        <div className="modal__delete-message">
          <p className="modal__delete-text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__delete-text">This action is irreversable.</p>
        </div>
        <p className="modal__delete-yes" onClick={handleDelete}>
          {isLoading ? "Saving..." : "Yes, delete item"}
        </p>
        <p className="modal__delete-cancel" onClick={handleCloseModal}>
          Cancel
        </p>
      </div>
    </div>
  );
};

export default DeleteCardModal;
