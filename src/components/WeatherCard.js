import React, { useContext } from "react";
import "../blocks/WeatherCard.css";
import { weatherOptions } from "../utils/constants";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/weatherApi";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });
  const currentTemperature = temperature(weatherTemp);
  const currentTemperatureString = currentTemperature[currentTemperatureUnit];
  const imageSrcUrl = weatherOption.url || "";

  return (
    <section className="weather__container" id="weather">
      <p className="weather__info">{currentTemperatureString}</p>
      <img
        className="weather__image"
        src={imageSrcUrl}
        alt="weather condition"
      />
    </section>
  );
};
export default WeatherCard;
