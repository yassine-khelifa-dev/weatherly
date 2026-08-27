/* =========================
   Helper
   Only for testing loading
========================= */

import axios from "axios";
import type { WeatherType } from "../types/weather";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function fetchWeather(city: string): Promise<WeatherType> {
  // Only for testing the loading UI.
  // Remove this later.
  await delay(700);

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6a4aa22e0779478dd1502914c88fbd34`,
  );

  return {
    name: response.data.name,

    number: Math.round(response.data.main.temp - 273.15),

    min: Math.round(response.data.main.temp_min - 273.15),

    max: Math.round(response.data.main.temp_max - 273.15),

    description: response.data.weather[0].description,

    timezone: response.data.timezone,

    icon: response.data.weather[0].icon,
  };
}
