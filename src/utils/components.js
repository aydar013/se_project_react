import daySunny from "../images/day/day-sunny.svg";
import dayCloudy from "../images/day/day-cloudy.svg";
import dayFoggy from "../images/day/day-foggy.svg";
import dayRainy from "../images/day/day-rainy.svg";
import daySnowy from "../images/day/day-snowy.svg";
import dayStormy from "../images/day/day-stormy.svg";
import nightMoon from "../images/night/night-moon.svg";
import nightCloudy from "../images/night/night-cloudy.svg";
import nightFoggy from "../images/night/night-foggy.svg";
import nightRainy from "../images/night/night-rainy.svg";
import nightSnowy from "../images/night/night-snowy.svg";
import nightStormy from "../images/night/night-stormy.svg";

export const WeatherOptions = [
  { url: daySunny, day: true, type: "sunny" },
  { url: dayCloudy, day: true, type: "cloudy" },
  { url: dayFoggy, day: true, type: "foggy" },
  { url: dayRainy, day: true, type: "rainy" },
  { url: daySnowy, day: true, type: "snowy" },
  { url: dayStormy, day: true, type: "stormy" },
  { url: nightMoon, day: false, type: "moon" },
  { url: nightCloudy, day: false, type: "cloudy" },
  { url: nightFoggy, day: false, type: "foggy" },
  { url: nightRainy, day: false, type: "rainy" },
  { url: nightSnowy, day: false, type: "snowy" },
  { url: nightStormy, day: false, type: "stormy" },
];

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];
