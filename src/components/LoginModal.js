import React from "react";
import ModalWithForm from "./ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({
  isOpen,
  onLoginUser,
  handleCloseModal,
  switchToRegisterModal,
}) => {
  const [userLoginEmail, setUserLoginEmail] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");

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
    setUserLoginEmail("");
    setUserLoginPassword("");
  }, [isOpen]);

  function handleUserLoginEmailChange(e) {
    setUserLoginEmail(e.target.value);
  }
  function handleUserLoginPasswordChange(e) {
    setUserLoginPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userLogin = {};
    userLogin.email = userLoginEmail;
    userLogin.password = userLoginPassword;

    onLoginUser(userLogin);
  }

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      name="login"
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-flex" id="modal-email-label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Email"
          value={userLoginEmail}
          onChange={handleUserLoginEmailChange}
          required
        />
      </label>
      <label className="modal__label-flex" id="modal-password-label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          minLength="1"
          maxLength="15"
          placeholder="Password"
          value={userLoginPassword}
          onChange={handleUserLoginPasswordChange}
          required
        />
      </label>
      <p
        type="button"
        className="switch__login"
        onClick={switchToRegisterModal}
      >
        or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
