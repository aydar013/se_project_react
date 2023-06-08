import React from "react";
import "../blocks/WeatherCard.css";
import { WeatherOptions } from "../utils/components";
// import { weatherTemp } from "../utils/components";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = WeatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather__container" id="weather">
      <p className="weather__info">{weatherTemp}°F</p>
      <img
        className="weather__image"
        src={imageSrcUrl}
        alt="weather condition"
      />
    </section>
  );
};
export default WeatherCard;
