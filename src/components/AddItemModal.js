import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [itemName, setItemName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    if (isOpen) {
      setItemName("");
      setImageLink("");
      setWeatherType("");
    }
  }, [isOpen]);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ itemName, imageLink, weatherType });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      name="add new item"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-flex">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={itemName}
          onChange={handleItemNameChange}
        />
      </label>
      <label className="modal__label-flex">
        Image
        <input
          className="modal__input"
          type="url"
          name="link"
          minLength="1"
          maxLength="400"
          placeholder="Image URL"
          value={imageLink}
          onChange={handleItemImageLinkChange}
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
              onChange={handleWeatherTypeChange}
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
              onChange={handleWeatherTypeChange}
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
              onChange={handleWeatherTypeChange}
            />
            <label className="modal__radio-button_label">Cold</label>
          </div>
        </div>
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
