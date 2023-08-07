import React from "react";
import ModalWithForm from "./ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, handleCloseModal, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    setUserName(currentUserName);
    setUserAvatar(currentUserAvatar);
  }, [currentUserName, currentUserAvatar]);

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handleUserAvatarChange(e) {
    setUserAvatar(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const updateUser = {};
    updateUser.name = userName;
    updateUser.avatar = userAvatar;
    onEditProfile(updateUser);
  }

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change Profile Data"
      onClose={handleCloseModal}
      name="user-profile-edit"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-flex">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          className="modal__input"
          type="url"
          name="link"
          placeholder="Avatar URL"
          value={userAvatar}
          onChange={handleUserAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
