import React from 'react';
import { useWeather } from '../context/Weather';
import { Droplets, Wind, Gauge, Sun, Sunset, ThermometerSun } from 'lucide-react'; 

const WeatherDetailItem = ({ label, value, icon: Icon }) => (
  <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-lg p-3 text-white text-center shadow-sm flex flex-col items-center justify-center">
    {Icon && <Icon className="w-6 h-6 mb-2 text-blue-300 drop-shadow" />} 
    <p className="text-sm text-white/70 drop-shadow">{label}</p>
    <p className="text-lg font-semibold drop-shadow">{value}</p>
  </div>
);

const WeatherDetailsGrid = () => {
  const weather = useWeather();
  const data = weather.data;

  if (!data || !data.current) return null;

  const current = data.current;
  const forecastDay = data.forecast?.forecastday?.[0]?.day;
  const astro = data.forecast?.forecastday?.[0]?.astro;

  return (
    <div className="flex-grow w-full md:w-1/4 lg:w-1/4 ml-0 md:ml-4 mt-8 md:mt-0 h-full">
      <div className="grid grid-cols-3 gap-4 h-full"> 
        <WeatherDetailItem label="Humidity" value={`${current.humidity}%`} icon={Droplets} />
        <WeatherDetailItem label="Wind Speed" value={`${current.wind_kph} km/h`} icon={Wind} />
        <WeatherDetailItem label="Pressure" value={`${current.pressure_mb} hPa`} icon={Gauge} />
        <WeatherDetailItem label="UV Index" value={`${current.uv}`} icon={ThermometerSun} />
        <WeatherDetailItem label="Sunrise" value={astro?.sunrise || 'N/A'} icon={Sun} />
        <WeatherDetailItem label="Sunset" value={astro?.sunset || 'N/A'} icon={Sunset} />
      </div>
    </div>
  );
};

export default WeatherDetailsGrid;