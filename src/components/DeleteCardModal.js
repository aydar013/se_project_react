import React from "react";

const DeleteCardModal = ({ handleCloseModal, handleDelete }) => {
  return (
    <div className="modal modal__delete-container">
      <button
        className="modal__close-button"
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
        Yes, delete item
      </p>
      <p className="modal__delete-cancel" onClick={handleCloseModal}>
        Cancel
      </p>
    </div>
  );
};

export default DeleteCardModal;
