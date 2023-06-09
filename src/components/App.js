// import logo from "./logo.svg";
import "../blocks/App.css";
import "../blocks/Page.css";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="page">
        <div className="page__wrapper">
          <Header onCreateModal={handleCreateModal} />
          <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          <Footer />
          {activeModal === "create" && (
            <ModalWithForm title="New garment" onClose={handleCloseModal}>
              <label className="modal__name-flex">
                Name
                <input
                  className="modal__input"
                  type="text"
                  name="name"
                  minLength="1"
                  maxLength="30"
                  placeholder="Name"
                />
              </label>
              <label className="modal__image-flex">
                Image
                <input
                  className="modal__input"
                  type="url"
                  name="link"
                  minLength="1"
                  maxLength="30"
                  placeholder="Image URL"
                />
              </label>
              <label className="modal__radio-buttons">
                <p className="modal__radio-buttons_title">
                  Select the weather type
                </p>
                <div>
                  <div>
                    <input
                      className="modal__radio-button"
                      type="radio"
                      id="hot"
                      value="hot"
                      name="weather"
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
                    />
                    <label className="modal__radio-button_label">Cold</label>
                  </div>
                </div>
              </label>
            </ModalWithForm>
          )}
          {activeModal === "preview" && (
            <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
