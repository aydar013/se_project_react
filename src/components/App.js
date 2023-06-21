// import logo from "./logo.svg";
import "../blocks/App.css";
import "../blocks/Page.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom";
import AddItemModal from "./AddItemModal";
import { defaultClothingItems } from "../utils/components";
import Profile from "./Profile";
import api from "../utils/itemsApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  // useEffect(() => {
  //   const closeByEsc = (e) => {
  //     if (e.key === "Escape") {
  //       handleCloseModal();
  //     }

  //     document.addEventListener("keyup", closeByEsc);

  //     return () => document.addEventListener("keyup", closeByEsc);
  //   };
  // }, []);

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItem = ({ name, link, weather }) => {
    const newItem = {
      name,
      link,
      weather,
    };

    api
      .addItem(newItem)
      .then((res) => {
        console.log(res);
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleDeleteItem = (item) => {
    console.log(item);
    api
      .deleteItem(item.id)
      .then(() => {
        const filteredCard = clothingItems.filter(
          (card) => card.id !== item.id
        );
        console.log(filteredCard);
        setClothingItems(filteredCard);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
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
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header onCreateModal={handleCreateModal} />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                />
              </Route>
              <Route path="/profile">
                <Profile
                  clothingItems={clothingItems}
                  onSelectCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                />
              </Route>
            </Switch>
            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                handleCloseModal={handleCloseModal}
                onAddItem={handleAddItem}
                isOpen={handleCreateModal}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                selectedCard={selectedCard}
                onClose={handleCloseModal}
                onDelete={handleDeleteItem}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
