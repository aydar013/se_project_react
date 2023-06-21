import React, { useContext } from "react";
import "../blocks/WeatherCard.css";
import { WeatherOptions } from "../utils/components";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { temperature } from "../utils/weatherApi";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const imageSrc = WeatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });
  const currentTemperature = temperature(weatherTemp);
  const currentTemperatureString = currentTemperature[currentTemperatureUnit];
  const imageSrcUrl = imageSrc[0].url || "";

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
