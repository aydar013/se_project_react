import React from "react";

const LogoutModal = ({ handleCloseModal, handleLogout }) => {
  return (
    <div className="modal modal__logout-container">
      <button
        className="modal__close-button"
        type="button"
        onClick={handleCloseModal}
      ></button>
      <div className="modal__logout-message">
        <p className="modal__logout-text">Are you sure you want to log out?</p>
      </div>
      <p className="modal__logout-yes" onClick={handleLogout}>
        Yes, log out
      </p>
      <p className="modal__logout-cancel" onClick={handleCloseModal}>
        Cancel
      </p>
    </div>
  );
};

export default LogoutModal;
