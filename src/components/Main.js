import React from "react";
import WeatherCard from "./WeatherCard";

import { defaultClothingItems } from "../utils/components";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ weatherTemp, onSelectCard }) {
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

  if (!weatherTemp) {
    return null;
  }

  const filteredCard = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <section className="main__section">
        <WeatherCard day={true} type="cloudy" weatherTemp={weatherTemp} />
        <div className="main__container">
          <p className="main__description">
            Today is {weatherTemp}°F / You may want to wear:
          </p>
          <div className="main__card-items">
            {filteredCard.map((item) => (
              <ItemCard key={item.id} item={item} onSelectCard={onSelectCard} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
