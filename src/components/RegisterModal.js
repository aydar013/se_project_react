import React from "react";
import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({
  isOpen,
  onRegisterUser,
  handleCloseModal,
  switchToLoginModal,
}) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatarLink, setUserAvatarLink] = useState("");

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

  useEffect(() => {
    setUserEmail("");
    setUserPassword("");
    setUserName("");
    setUserAvatarLink("");
  }, [isOpen]);

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value);
  }
  function handleUserPasswordChange(e) {
    setUserPassword(e.target.value);
  }
  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }
  function handleUserAvatarLinkChange(e) {
    setUserAvatarLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {};
    newUser.email = userEmail;
    newUser.password = userPassword;
    newUser.name = userName;
    newUser.avatar = userAvatarLink;
    onRegisterUser(newUser);
    console.log(newUser);
  }

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign up"
      name="Register"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-flex" id="modal-email-label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Email"
          value={userEmail}
          onChange={handleUserEmailChange}
          required
        />
      </label>
      <label className="modal__label-flex" id="modal-password-label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          minLength="1"
          maxLength="15"
          placeholder="Password"
          value={userPassword}
          onChange={handleUserPasswordChange}
          required
        />
      </label>
      <label className="modal__label-flex" id="modal-name-label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={userName}
          onChange={handleUserNameChange}
        />
      </label>
      <label className="modal__label-flex" id="modal-avatar-label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar link"
          minLength="1"
          placeholder="Avatar URL"
          value={userAvatarLink}
          onChange={handleUserAvatarLinkChange}
        />
      </label>
      <p className="switch__login" onClick={switchToLoginModal}>
        or Log in
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
