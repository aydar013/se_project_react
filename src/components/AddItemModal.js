import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      name="add"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__name-flex">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__image-flex">
        Image
        <input
          className="modal__input"
          type="url"
          name="link"
          minLength="1"
          maxLength="200"
          placeholder="Image URL"
          value={link}
          onChange={handleLinkChange}
        />
      </label>
      <label className="modal__radio-buttons">
        <p className="modal__radio-buttons_title">Select the weather type</p>
        <div>
          <div>
            <input
              className="modal__radio-button"
              type="radio"
              id="hot"
              value="hot"
              name="weather"
              onChange={handleWeatherChange}
            />
            <label className="modal__radio-button_label">Hot</label>
          </div>
          <div>
            <input
              className="modal__radio-button"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
              onChange={handleWeatherChange}
            />
            <label className="modal__radio-button_label">Warm</label>
          </div>
          <div>
            <input
              className="modal__radio-button"
              type="radio"
              id="cold"
              value="cold"
              name="weather"
              onChange={handleWeatherChange}
            />
            <label className="modal__radio-button_label">Cold</label>
          </div>
        </div>
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
