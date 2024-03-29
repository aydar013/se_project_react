import React, { useContext } from "react";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/weatherApi";

function Main({ weatherTemp, onSelectCard, cards, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();

  const currentTemperature = temperature(weatherTemp);
  const currentTemperatureString = currentTemperature[currentTemperatureUnit];

  const filteredCard = cards?.filter((item) => {
    return item?.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <section className="main__section">
        <WeatherCard day={true} type="cloudy" weatherTemp={weatherTemp} />
        <div className="main__container">
          <p className="main__description">
            Today is {currentTemperatureString} / You may want to wear:
          </p>
          <div className="main__card-items">
            {filteredCard.map((card) => {
              return (
                <ItemCard
                  item={card}
                  key={card._id || card.id}
                  onSelectCard={onSelectCard}
                  onCardLike={onCardLike}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
