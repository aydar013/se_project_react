import React from "react";
import "../blocks/ModalWithForm.css";
import "../blocks/ItemModal.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  handleCloseModal,
  name,
  onSubmit,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseModal}
        />
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} name={name} className="modal__form">
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
