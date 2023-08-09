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

export const longitude = -118.439957;
export const latitude = 34.14949;
export const APIkey = "393f2cb37617f240cffcb2c6fc010659";

export const currentYear = new Date().getFullYear();
export const weatherOptions = [
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
