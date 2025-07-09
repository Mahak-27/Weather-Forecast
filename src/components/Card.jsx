import React from "react";
import { useWeather } from "../context/Weather";

const getAirQualityText = (index) => {
  switch (index) {
    case 1: return 'Good';
    case 2: return 'Moderate';
    case 3: return 'Unhealthy for sensitive groups';
    case 4: return 'Unhealthy';
    case 5: return 'Very Unhealthy';
    case 6: return 'Hazardous';
    default: return 'Unknown';
  }
};



const Card=()=>{
    const weather=useWeather();
    const data=weather.data;
    

    if(!data) return null;

    const airIndex = data.current?.air_quality?.["us-epa-index"];
    const airText = getAirQualityText(airIndex);

    return(
        

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full md:w-3/4 lg:w-2/4 shadow-lg flex-shrink-0 border border-white/20">
          <div className="flex items-center justify-between">
          <div>
          <h2 className="text-pink-300 text-lg font-bold drop-shadow-md">{data?.location?.name}, {data?.location?.region}, {data?.location?.country}</h2>
          <h1 className="text-5xl font-bold text-yellow-200 drop-shadow-xl">{data.current.temp_c}&deg;C</h1>
          <p className="text-white/80 text-lg drop-shadow">{data.current.condition.text}</p>
          </div>

          <img
          src={data.current.condition.icon}
          alt="weather-icon"
          className="w-24 h-24 sm:w-28 sm:h-28"
          />
          </div>
          <div className="mt-4 text-sm text-white/80 flex justify-between drop-shadow">
          <p>
          Air quality: {airIndex} - {airText}
          </p>
          <p>
          {data.forecast?.forecastday?.[0]?.day?.maxtemp_c}° / {" "}
          <span className="text-white/60"></span>{data.forecast?.forecastday?.[0]?.day?.mintemp_c}°
          </p>
          </div>

        </div>
    )
}

export default Card;