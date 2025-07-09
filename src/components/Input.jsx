import React from "react";
import { useWeather } from "../context/Weather";

const Input=()=>{
    const weather=useWeather();
    console.log(weather);


    return(
      <div className="flex flex-col items-start">
        <input
      className="border-2 border-white/20 px-4 py-2 rounded-md text-white w-60 focus:outline-none focus:ring-2 focus:ring-white-800 transition-all shadow-md"
      placeholder="Search for a location..."
      value={weather.searchCity || ""}
      onChange={(e) => {
        weather.setSearchCity(e.target.value);
        if (weather.error) weather.setError("");
      }}
    />
      </div>


        
    )
}

export default Input;