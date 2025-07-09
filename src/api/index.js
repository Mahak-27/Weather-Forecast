const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;



export const getWeatherDataForCity = async (city) => {
  const response = await fetch(`${baseURL}&q=${city}&days=7&aqi=yes&alerts=no`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const getWeatherDataForLocation = async (lat, long) => {
  const response = await fetch(`${baseURL}&q=${lat},${long}&days=7&aqi=yes&alerts=no`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
