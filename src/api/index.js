const baseURL="https://api.weatherapi.com/v1/forecast.json?key=54b8128d1c9648df921143410250807"


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
